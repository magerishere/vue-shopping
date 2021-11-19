export default {
  blogs(state) {
    return state.blogs;
  },
  hasBlogs(state) {
    return state.blogs.data && state.blogs.data.length > 0;
  },
  // pages(state) {
  //   //  if have no pages
  //   if (state.blogs.to === state.blogs.total) {
  //     return [];
  //   }
  //   const linksLength = state.blogs.links.length;
  //   return state.blogs.links.slice(1, linksLength - 1);
  // },

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
    return state.userBlogs.data && state.userBlogs.data.length > 0;
  },
  userBlog(state) {
    return state.userBlog;
  },
  hasUserBlog(state) {
    return state.userBlog.data && state.userBlog.data.length > 0;
  },
};
