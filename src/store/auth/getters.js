export default {
  token(state) {
    return state.token;
  },
  isAuth(state) {
    return !!state.userId && !!state.token;
  },
  isCustomer(state) {
    return state.userRole == 0;
  },
  isSeller(state) {
    return state.userRole == 1;
  },
};
