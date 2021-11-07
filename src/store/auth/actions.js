import Api from "@/Api";
import router from "../../router";
export default {
  async login(context, payload) {
    // data
    const userData = {
      email: payload.get("email"),
      password: payload.get("password"),
      url: "/login",
    };
    return context.dispatch("auth", userData);
  },
  async register(context, payload) {
    // data
    const userData = {
      name: payload.get("userName"),
      email: payload.get("email"),
      password: payload.get("password"),
      url: "/register",
    };
    return context.dispatch("auth", userData);
  },
  async auth(context, payload) {
    const authData = payload;
    const url = authData.url;
    // send Http request
    const response = await Api.post(url, authData);
    const responseData = response.data;
    // errors
    context.dispatch("errorsHandler", responseData, { root: true });
    // success
    localStorage.setItem("userId", responseData.userId);
    localStorage.setItem("token", responseData.token);
    context.commit("setUser", responseData);
    router.replace("/dashboard");
  },
  tryLogin(context) {
    // data
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const userData = { userId, token };
    context.commit("setUser", userData);
  },
  async logout(context) {
    // data
    const token = localStorage.getItem("token");
    // header config
    Api.defaults.headers.post["Authorization"] = "Bearer " + token;
    // send Http request
    const response = await Api.post("/logout");
    const responseData = response.data;
    // errors
    context.dispatch("errorsHandler", responseData, { root: true });
    // success
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    context.commit("setUser", responseData);
    router.replace("/");
  },
};
