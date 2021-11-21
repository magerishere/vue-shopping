import { createStore } from "vuex";
import authModule from "./auth/index";
import productModule from "./product/index";
import blogModule from "./blog/index";
import userModule from "./user/index";
import commentModule from "./comment/index";
import Api from "@/Api";
import router from "@/router";

const store = createStore({
  modules: {
    auth: authModule,
    product: productModule,
    blog: blogModule,
    user: userModule,
    comment: commentModule,
  },
  state() {
    return {
      toastStatus: "",
    };
  },
  mutations: {
    setToastStatus(state, payload) {
      state.toastStatus = payload;
    },
  },
  actions: {
    /**
     * @var url
     * @var commit
     */
    async get(context, payload) {
      // action
      const url = payload.url;
      const response = await Api.get(url);
      const responseData = response.data;
      // error handling
      context.dispatch("errorsHandler", responseData);
      // success
      const commit = payload.commit;
      context.commit(commit, responseData);
    },
    /**
     * @var data
     * @var url
     * @var redirect optional
     * @var commit optional
     */
    async post(context, payload) {
      // action
      const data = payload.data;
      const url = payload.url;
      const response = await Api.post(url, data);
      const responseData = response.data;
      // error handling
      context.dispatch("errorsHandler", responseData);
      // success
      const redirect = payload.redirect;
      if (redirect) {
        router.replace(redirect);
      }

      const commit = payload.commit;
      if (commit) {
        context.commit(commit, responseData);
      }
      const success = payload.success;
      if (success) {
        context.commit("setToastStatus", "success");
      }
    },
    /**
     * @var data
     * @var url
     * @var redirect
     */
    async patch(context, payload) {
      // action
      payload.data.append("_method", "patch");
      const data = payload.data;
      const url = payload.url;
      const response = await Api.post(url, data);
      const responseData = response.data;
      // error handling
      context.dispatch("errorsHandler", responseData);
      // success
      const redirect = payload.redirect;
      router.replace(redirect);
      context.commit("setToastStatus", "success");
    },
    /**
     * @var data
     * @var url
     * @var redirect
     * @var state
     * @var commit
     */
    async delete(context, payload) {
      // action
      payload.data.append("_method", "delete");
      const data = payload.data;
      const url = payload.url;
      const response = await Api.post(url, data);
      const responseData = response.data;
      // error handling
      context.dispatch("errorsHandler", responseData);
      // success - remove items from main data
      console.log(data.get("ids"), "after deleting");
      const ids = JSON.parse(data.get("ids"));
      const state = payload.state;
      const items = context.getters[state];
      for (let i = 0; i < ids.length; i++) {
        const indexOfItem = items.data.findIndex((blog) => blog.id == ids[i]);
        items.data.splice(indexOfItem, 1);
      }
      // commit
      const commit = payload.commit;
      context.commit(commit, items);
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
  getters: {
    getToastStatus(state) {
      return state.toastStatus;
    },
  },
});

export default store;
