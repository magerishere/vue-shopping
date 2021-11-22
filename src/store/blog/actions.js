export default {
  getBlogs(context, payload) {
    const page = payload.get("page");
    const data = {
      url: "/blogs?" + page,
      commit: "blog/setBlogs",
    };
    return context.dispatch("get", data, { root: true });
  },
  async addBlog(context, payload) {
    const data = {
      data: payload,
      url: "/blog",
      redirect: { name: "userBlogs" },
      success: true,
    };
    return context.dispatch("post", data, { root: true });
  },
  async editBlog(context, payload) {
    const data = {
      data: payload,
      url: "/blog/" + payload.get("id"),
      redirect: { name: "userBlogs" },
      success: true,
    };
    return context.dispatch("patch", data, { root: true });
  },
  async removeBlog(context, payload) {
    payload.append("_method", "delete");
    const data = {
      data: payload,
      url: "/blogs",
      state: "blog/userBlogs",
    };
    return context.dispatch("delete", data, { root: true });
  },

  async getBlog(context, payload) {
    const blogId = payload.get("id");
    const data = {
      url: "/blog/" + blogId,
      commit: "blog/setBlog",
    };
    return context.dispatch("get", data, { root: true });
  },

  async setFilters(context, payload) {
    const data = {
      data: payload,
      url: "/blogs",
      commit: "blog/setBlogs",
    };
    return context.dispatch("post", data, { root: true });
  },
  async getUserBlogs(context, payload) {
    const page = payload.get("page");
    const data = {
      url: "/blogs/user" + "?" + page,
      commit: "blog/setUserBlogs",
    };
    return context.dispatch("get", data, { root: true });
  },
  async getUserBlog(context, payload) {
    const blogId = payload.get("id");
    const data = {
      url: "/blog/user/" + blogId + "/edit",
      commit: "blog/setUserBlog",
    };
    return context.dispatch("get", data, { root: true });
  },
  async likeBlog(context, payload) {
    const blogId = payload.get("blogId");
    const data = {
      url: "/blog/" + blogId + "/like",
    };
    return context.dispatch("post", data, { root: true });
  },
  async dislikeBlog(context, payload) {
    const blogId = payload.get("blogId");
    const data = {
      url: "/blog/" + blogId + "/dislike",
    };
    return context.dispatch("post", data, { root: true });
  },
};
