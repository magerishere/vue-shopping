export default {
  blogs(state) {
    return state.blogs.data;
  },
  hasBlogs(state) {
    return state.blogs.data && state.blogs.data.length > 0;
  },
  pages(state) {
    const linksLength = state.blogs.links.length;
    return state.blogs.links.slice(1, linksLength - 1);
  },

  blog(state) {
    return state.blog;
  },
  hasBlog(state) {
    return !!state.blog;
  },
  userBlogs(state) {
    return state.userBlogs.data;
  },
  hasUserBlogs(state) {
    return state.userBlogs.data && state.userBlogs.data.length > 0;
  },
  userPages(state) {
    //  if have no pages
    if (state.userBlogs.to === state.userBlogs.total) {
      return [];
    }
    const linksLength = state.userBlogs.links.length;
    return state.userBlogs.links.slice(1, linksLength - 1);
  },
  userBlog(state) {
    return state.userBlog;
  },
  hasUserBlog(state) {
    return !!state.userBlog;
  },
};
