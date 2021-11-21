export default {
  userProducts(state) {
    return state.userProducts;
  },
  hasUserProducts(state) {
    return state.userProducts.data && state.userProducts.data.length > 0;
  },
};
