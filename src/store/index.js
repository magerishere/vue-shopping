import { createStore } from "vuex";
import authModule from "./auth/index";
import blogModule from "./blog/index";
import userModule from "./user/index";
import commentModule from "./comment/index";
import Api from "@/Api";

const store = createStore({
  modules: {
    auth: authModule,
    blog: blogModule,
    user: userModule,
    comment: commentModule,
  },
  actions: {
    async likesAndDislikes(context, payload) {
      const url = payload;
      const response = await Api.post(url);
      const responseData = response.data;
      context.dispatch("errorsHandler", responseData);
    },
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
