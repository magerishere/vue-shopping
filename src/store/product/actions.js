export default {
  async addProduct(context, payload) {
    const productData = payload;
    const data = {
      url: "/product",
      data: productData,
      redirect: { name: "userProducts" },
      success: true,
    };

    return context.dispatch("post", data, { root: true });
  },

  async editProduct(context, payload) {
    const productId = payload.get("id");
    const data = {
      url: "/product/" + productId,
      data: payload,
      redirect: { name: "userProducts" },
    };
    return context.dispatch("patch", data, { root: true });
  },

  async removeProduct(context, payload) {
    const ids = payload;
    const data = {
      url: "/products",
      data: ids,
      state: "product/userProducts",
    };

    return context.dispatch("delete", data, { root: true });
  },

  async getProducts(context, payload) {
    const page = payload.get("page");
    const data = {
      url: "/products" + "?" + page,
      commit: "product/setProducts",
    };
    return context.dispatch("get", data, { root: true });
  },
  async getProduct(context, payload) {
    const productId = payload.get("id");
    const data = {
      url: "/product/" + productId,
      commit: "product/setProduct",
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
  async getUserProduct(context, payload) {
    const productId = payload.get("id");
    const data = {
      url: "/product/" + productId + "/edit",
      commit: "product/setUserProduct",
    };
    return context.dispatch("get", data, { root: true });
  },
};
