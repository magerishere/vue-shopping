import { createStore } from "vuex";
import authModule from "./auth/index";
import blogModule from "./blog/index";
import userModule from "./user/index";
import commentModule from "./comment/index";
const store = createStore({
  modules: {
    auth: authModule,
    blog: blogModule,
    user: userModule,
    comment: commentModule,
  },
  actions: {
    errorsHandler(_, payload) {
      const responseData = payload;
      // errors
      if (responseData.status !== 200) {
        const errors = new Error(responseData.messages);
        console.log(errors);
        throw errors;
      }
    },
  },
});

export default store;
