import Api from "@/Api";
import router from "@/router";
export default {
  async addBlog(context, payload) {
    const blogData = payload;
    const token = localStorage.getItem("token");
    Api.defaults.headers.post["Authorization"] = "Bearer " + token;
    const response = await Api.post("/blog", blogData);

    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });

    context.commit("setUserBlogs", responseData);

    router.push("/dashboard/blogs");
  },
  async editBlog(context, payload) {
    const blogData = payload;
    blogData.append("_method", "patch");
    const token = localStorage.getItem("token");
    Api.defaults.headers.post["Authorization"] = "Bearer " + token;
    const response = await Api.post(`/blog/${blogData.get("id")}`, blogData);
    console.log(response);
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
    router.replace({ name: "userBlogs" });
  },
  async getBlogs(context) {
    const response = await Api.get("/blogs");
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
    context.commit("setBlogs", responseData);
  },
  async getBlog(context, payload) {
    const blogId = payload.get("id");
    const response = await Api.get("/blog/" + blogId);
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
    context.commit("setBlog", responseData);
  },
  async getUserBlogs(context) {
    const token = localStorage.getItem("token");
    Api.defaults.headers.get["Authorization"] = "Bearer " + token;

    const response = await Api.get("/blogs/user");
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
    context.commit("setUserBlogs", responseData);
  },
  async getUserBlog(context, payload) {
    const token = localStorage.getItem("token");
    const blogId = payload.get("id");
    Api.defaults.headers.get["Authorization"] = "Bearer " + token;

    const response = await Api.get(`/blog/user/${blogId}/edit`);
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
    context.commit("setUserBlog", responseData);
  },
};
