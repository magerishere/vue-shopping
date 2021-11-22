<template>
  <div class="container">
    <div class="row">
      <products-sidebar @apply-filters="applyFilters"></products-sidebar>
      <base-dialog
        :show="!!form.errors.messages"
        title="خطایی رخ داد"
        :messages="form.errors.messages"
        @close="form.errors.confirm"
      >
      </base-dialog>
      <base-spinner v-if="form.config.isLoading"></base-spinner>

      <section class="col-md-9">
        <transition-group
          appear
          tag="ul"
          name="product-list"
          v-if="hasProducts && !form.config.isLoading"
          class="row mx-1"
        >
          <product-item
            v-for="product in products.data"
            :key="product.id"
            :id="product.id"
            :catName="product.catName"
            :title="product.title"
            :image="product.image"
            :content="product.content"
            :views="product.views"
            :created-at="product.created_at"
            :likes="product.likes_count"
            :comments="product.comments_count"
          >
          </product-item>
        </transition-group>

        <div
          class="text-center mt-5"
          v-if="!hasProducts && !form.config.isLoading"
        >
          <h4 class="mb-5">هیچ محصولی وجود ندارد</h4>
          <base-button
            v-if="isAuth && isSeller"
            link
            to="/dashboard/product/create"
            >ایجاد محصول</base-button
          >
        </div>
        <base-pagination
          v-if="hasProducts && !form.config.isLoading"
          :pages="products.links"
          @paginator="paginator"
        ></base-pagination>
      </section>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import useForm from "@/hooks/form/useForm";
import ProductItem from "../../components/products/ProductItem.vue";
import ProductsSidebar from "../../components/products/ProductsSidebar.vue";
export default {
  name: "BlogsList",
  components: {
    ProductItem,
    ProductsSidebar,
  },
  emits: {
    setFilters: {
      type: Function,
      required: true,
    },
    paginator: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const form = useForm();

    onMounted(async () => {
      await form.submit("product/getProducts");
    });
    const products = computed(() => {
      return store.getters["product/products"];
    });

    const hasProducts = computed(() => {
      return store.getters["product/hasProducts"];
    });

    const isAuth = computed(() => {
      return store.getters["auth/isAuth"];
    });

    const isSeller = computed(() => {
      return store.getters["auth/isSeller"];
    });

    // emits
    function applyFilters(filters) {
      form.submit("product/setFilters", filters);
    }

    function paginator(queryParamPage) {
      const productsData = {
        page: {
          val: queryParamPage,
        },
      };
      form.submit("product/getProducts", productsData);
    }

    return {
      products,
      hasProducts,
      isAuth,
      applyFilters,
      paginator,
      isSeller,
      form,
    };
  },
};
</script>

<style scoped>
.product-list-enter-from,
.product-list-leave-to {
  opacity: 0;
}

.product-list-enter-active {
  transition: all 0.7s ease-out;
}

.product-list-leave-active {
  transition: all 0.7s ease-in;
}

.product-list-enter-to,
.product-list-leave-from {
  opacity: 1;
}
</style>
