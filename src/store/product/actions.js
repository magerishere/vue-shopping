import Api from "@/Api";
import router from "@/router";

export default {
  async addProduct(context, payload) {
    const productData = payload;
    const response = await Api.post("/product", productData);
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
    router.push({ name: "userProducts" });
    context.dispatch("setToastStatus", "success", { root: true });
  },

  async removeProduct(context, payload) {
    const ids = payload;
    const data = {
      url: "/products",
      commit: "setUserProducts",
      data: ids,
    };
    console.log(data, "before deleting");

    return context.dispatch("delete", data, { root: true });
  },

  async getProducts(context, payload) {
    const page = payload.get("page");
    const data = {
      url: "/products/user" + "?" + page,
      commit: "setUserProducts",
    };
    return context.dispatch("get", data, { root: true });
  },
  async getUserProducts(context, payload) {
    const page = payload.get("page");
    const data = {
      url: "/products/user" + "?" + page,
      commit: "product/setUserProducts",
    };
    return context.dispatch("get", data, { root: true });
  },
};
