import Api from "@/Api";
export default {
  async addComment(context, payload) {
    const commentData = payload;
    const token = localStorage.getItem("token");
    Api.defaults.headers.post["Authorization"] = "Bearer " + token;
    const response = await Api.post("/comment", commentData);
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
  },
  async likeComment(context, payload) {
    const commentId = payload.commentId;
    const token = localStorage.getItem("token");
    Api.defaults.headers.post["Authorization"] = "Bearer " + token;
    const response = await Api.post(`/comment/${commentId}/like`);
    const responseData = response.data;
    context.dispatch("errorsHandler", responseData, { root: true });
  },
};
