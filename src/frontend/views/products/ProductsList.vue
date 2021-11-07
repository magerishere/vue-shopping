<template>
  <div class="row">
    <products-sidebar></products-sidebar>

    <section class="col-md-9">
      <ul class="row">
        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
      </ul>
    </section>
  </div>
</template>

<script>
import ProductItem from "../../components/products/ProductItem.vue";
import ProductsSidebar from "../../components/products/ProductsSidebar.vue";

export default {
  name: "ProductsList",
  components: {
    ProductItem,
    ProductsSidebar,
  },
};
</script>
