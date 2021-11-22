export default {
  setProducts(state, payload) {
    state.products = payload.products;
  },
  setProduct(state, payload) {
    state.product = payload.product;
  },
  setUserProducts(state, payload) {
    state.userProducts = payload.userProducts;
  },
  setUserProduct(state, payload) {
    state.userProduct = payload.userProduct;
  },
};
