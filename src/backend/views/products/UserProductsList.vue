<template>
  <div>
    <base-spinner v-if="form.config.isLoading"></base-spinner>
    <base-dialog
      :show="!!form.errors.messages"
      :messages="form.errors.messages"
      @close="form.errors.confirm"
    ></base-dialog>
    <base-dialog
      :show="confirmRemove"
      title="هشدار"
      @close="toggleConfirmRemove"
      mode="danger"
      confirm
      @confirmed="remove"
    ></base-dialog>
    <base-button
      v-if="productIds.length > 0"
      mode="danger small"
      @click="toggleConfirmRemove"
      >حذف موارد انتخاب شده</base-button
    >
    <base-table v-if="hasUserProducts && !form.config.isLoading">
      <template #head>
        <tr>
          <th>
            <BaseInputCheckbox
              text="#"
              id="selectedAll"
              v-model="selectedAll"
            />
          </th>
          <th>عکس</th>
          <th>دسته بندی</th>
          <th>عنوان</th>
          <th>محتوا</th>
          <th>عملیات</th>
        </tr>
      </template>
      <template #default>
        <user-product-item
          v-for="product in userProducts.data"
          :key="product.id"
          :id="product.id"
          :image="product.image"
          :catName="product.catName"
          :title="product.title"
          :content="product.content"
          v-model="productIds"
        ></user-product-item>
      </template>
    </base-table>
    <base-pagination
      v-if="hasUserProducts && !form.config.isLoading"
      :pages="userProducts.links"
      @paginator="paginator"
    ></base-pagination>
    <div v-if="!hasUserProducts && !form.config.isLoading" class="text-center">
      <p>هنوز هیچ محصولی ندارید.</p>
      <base-button link :to="productCreateLink">ایجاد محصول</base-button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import useForm from "@/hooks/form/useForm";
import UserProductItem from "../../components/products/UserProductItem.vue";

export default {
  name: "UserProductsList",
  components: {
    UserProductItem,
  },
  setup() {
    const form = useForm();
    onMounted(async () => {
      await form.submit("product/getUserProducts");
    });
    const store = useStore();
    const userProducts = computed(() => {
      return store.getters["product/userProducts"];
    });

    const hasUserProducts = computed(() => {
      return store.getters["product/hasUserProducts"];
    });

    const productCreateLink = { name: "productCreate" };
    const productIds = ref([]);
    const selectedAll = computed({
      get: () => productIds.value.length === userProducts.value.length,
      set: (value) => {
        productIds.value = [];
        if (value) {
          userProducts.value.data.forEach((product) => {
            productIds.value.push(product.id);
          });
        }
      },
    });
    const confirmRemove = ref(false);
    const toggleConfirmRemove = () => {
      confirmRemove.value = !confirmRemove.value;
    };

    const remove = async () => {
      const data = {
        ids: {
          val: productIds.value,
        },
      };
      // errors(data);
      await form.submit("product/removeProduct", data, false);
      confirmRemove.value = false;
    };

    const paginator = async (queryParam) => {
      const data = {
        page: {
          val: queryParam,
        },
      };
      await form.submit("product/getUserProducts", data);
    };
    return {
      userProducts,
      hasUserProducts,
      productCreateLink,
      form,
      selectedAll,
      productIds,
      confirmRemove,
      toggleConfirmRemove,
      remove,
      paginator,
    };
  },
};
</script>
