export default {
  setComment(state, payload) {
    const comment = payload.comment;
    state.comments.unshift(comment);
  },
};
