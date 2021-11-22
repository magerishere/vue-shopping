<template>
  <div class="row">
    <base-spinner v-if="form.config.isLoading"></base-spinner>
    <base-dialog
      :show="!!form.errors.messages"
      @close="form.errors.confirm"
      :messages="form.errors.messages"
    >
    </base-dialog>
    <product-detail-sidebar
      v-if="hasProduct && !form.config.isLoading"
      :user="product.user"
      :views="product.views"
      :commentsCount="product.comments.length"
      :likesCount="product.likes.length"
      :dislikesCount="product.dislikes.length"
    ></product-detail-sidebar>
    <section class="col-md-9">
      <product-detail-item
        v-if="hasProduct && !form.config.isLoading"
        :id="product.id"
        :title="product.title"
        :image="product.image"
        :likes="product.likes"
        :dislikes="product.dislikes"
        :content="product.content"
        :comments="product.comments"
      ></product-detail-item>
    </section>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import useForm from "@/hooks/form/useForm";
import ProductDetailSidebar from "../../components/products/ProductDetailSidebar.vue";
import ProductDetailItem from "../../components/products/ProductDetailItem.vue";
export default {
  name: "ProductDetail",
  components: {
    ProductDetailSidebar,
    ProductDetailItem,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const form = useForm();
    const productData = reactive({
      id: {
        val: props.id,
      },
    });
    onMounted(async () => {
      await form.submit("product/getProduct", productData);
    });
    const product = computed(function () {
      return store.getters["product/product"];
    });

    const hasProduct = computed(() => {
      return store.getters["product/hasProduct"];
    });

    return { product, hasProduct, form };
  },
};
</script>
