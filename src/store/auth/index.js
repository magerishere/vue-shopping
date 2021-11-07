import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      userId: null,
      token: null,
    };
  },
  mutations,
  actions,
  getters,
};
