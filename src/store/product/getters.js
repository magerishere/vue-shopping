export default {
  products(state) {
    return state.products;
  },
  hasProducts(state) {
    return state.products.data && state.products.data.length > 0;
  },
  product(state) {
    return state.product;
  },
  hasProduct(state) {
    return !!state.product;
  },
  userProducts(state) {
    return state.userProducts;
  },
  hasUserProducts(state) {
    return state.userProducts.data && state.userProducts.data.length > 0;
  },
  userProduct(state) {
    return state.userProduct;
  },
};
