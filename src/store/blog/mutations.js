export default {
  setBlogs(state, payload) {
    state.blogs = payload.blogs;
  },
  setBlog(state, payload) {
    state.blog = payload.blog;
  },
  setUserBlogs(state, payload) {
    state.userBlogs = payload.userBlogs;
  },
  setUserBlog(state, payload) {
    state.userBlog = payload.blog;
  },
};
