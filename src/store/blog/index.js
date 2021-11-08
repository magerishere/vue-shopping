import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      blogs: [],
      blog: null,
      userBlogs: [],
      userBlog: null,
    };
  },
  mutations,
  actions,
  getters,
};
