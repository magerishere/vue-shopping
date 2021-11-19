export default {
  setBlogs(state, payload) {
    state.blogs = payload.blogs ? payload.blogs : payload;
  },
  setBlog(state, payload) {
    state.blog = payload.blog ? payload.blog : payload;
  },
  setUserBlogs(state, payload) {
    state.userBlogs = payload.userBlogs ? payload.userBlogs : payload;
  },
  setUserBlog(state, payload) {
    state.userBlog = payload.userBlog ? payload.userBlog : payload;
  },
};
