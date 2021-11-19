export default {
  userProducts(state) {
    return state.userProducts.data;
  },
  hasUserProducts(state) {
    return state.userProducts.data && state.userProducts.data.length > 0;
  },
  userPages(state) {
    //  if have no pages
    if (state.userProducts.to === state.userProducts.total) {
      return [];
    }
    const linksLength = state.userProducts.links.length;
    return state.userProducts.links.slice(1, linksLength - 1);
  },
};
