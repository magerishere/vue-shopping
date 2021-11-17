export default {
  setUser(state, payload) {
    state.userId = payload.userId;
    state.userRole = payload.userRole;
    state.token = payload.token;
  },
};
