import Api from "@/Api";
import router from "@/router";
export default {
  async addBlog(context, payload) {
    const blogData = payload;
    const response = await Api.post("/blog", blogData);
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });

    context.commit("setUserBlogs", responseData);

    router.push("/dashboard/blogs");
  },
  async editBlog(context, payload) {
    const blogData = payload;
    blogData.append("_method", "patch");
    const response = await Api.post(`/blog/${blogData.get("id")}`, blogData);
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
    console.log(blogId);
    const response = await Api.get("/blog/" + blogId);
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
    context.commit("setBlog", responseData);
  },
  async setOrder(context, payload) {
    const orderData = payload;
    const response = await Api.post("/blogs", orderData);
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
    context.commit("setBlogs", responseData);
  },
  async setFilters(context, payload) {
    const filtersData = payload;
    const response = await Api.post("/blogs", filtersData);
    console.log(response);
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
    context.commit("setBlogs", responseData);
  },
  async getUserBlogs(context) {
    const response = await Api.get("/blogs/user");
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
    context.commit("setUserBlogs", responseData);
  },
  async getUserBlog(context, payload) {
    const blogId = payload.get("id");

    const response = await Api.get(`/blog/user/${blogId}/edit`);
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
    context.commit("setUserBlog", responseData);
  },
  async likeBlog(context, payload) {
    const blogId = payload.get("blogId");
    const url = `/blog/${blogId}/like`;
    return context.dispatch("likesAndDislikes", url, { root: true });
  },
  async dislikeBlog(context, payload) {
    const blogId = payload.get("blogId");
    const url = `/blog/${blogId}/dislike`;
    return context.dispatch("likesAndDislikes", url, { root: true });
  },
};
