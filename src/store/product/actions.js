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

  async getProducts(context, payload) {
    const page = payload.get("page");
    const response = await Api.get("/products/user" + "?" + page);
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
    context.commit("setUserProducts", responseData);
  },
};
