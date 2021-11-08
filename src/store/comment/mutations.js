export default {
  setComments(state, payload) {
    const comment = payload.comment;
    state.comments.unshift(comment);
  },
};
