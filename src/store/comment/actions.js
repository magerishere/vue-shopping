import Api from "@/Api";
export default {
  async addComment(context, payload) {
    const commentData = payload;
    const response = await Api.post("/comment", commentData);
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
    context.commit("setToastStatus", "success", { root: true });
  },
  async likeComment(context, payload) {
    const commentId = payload.get("commentId");
    const url = `/comment/${commentId}/like`;
    return context.dispatch("likesAndDislikes", url, { root: true });
  },
  async dislikeComment(context, payload) {
    const commentId = payload.get("commentId");
    const url = `/comment/${commentId}/dislike`;
    return context.dispatch("likesAndDislikes", url, { root: true });
  },
  async addReply(context, payload) {
    const replyData = payload;
    const response = await Api.post(`/comment-reply`, replyData);
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
    context.commit("setToastStatus", "success", { root: true });
  },
  async likeCommentReply(context, payload) {
    const commentReplyId = payload.get("commentReplyId");
    const url = `/comment-reply/${commentReplyId}/like`;
    return context.dispatch("likesAndDislikes", url, { root: true });
  },
  async dislikeCommentReply(context, payload) {
    const commentReplyId = payload.get("commentReplyId");
    const url = `/comment-reply/${commentReplyId}/dislike`;
    return context.dispatch("likesAndDislikes", url, { root: true });
  },
};
