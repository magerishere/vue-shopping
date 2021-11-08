export default {
  blogs(state) {
    return state.blogs;
  },
  hasBlogs(state) {
    return state.blogs && state.blogs.length > 0;
  },
  blog(state) {
    return state.blog;
  },
  hasBlog(state) {
    return !!state.blog;
  },
  userBlogs(state) {
    return state.userBlogs;
  },
  hasUserBlogs(state) {
    return state.userBlogs && state.userBlogs.length > 0;
  },
  userBlog(state) {
    return state.userBlog;
  },
  hasUserBlog(state) {
    return !!state.userBlog;
  },
};
