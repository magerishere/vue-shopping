export default {
  like(context, payload) {
    const type = payload.get("likeableType");
    const id = payload.get("likeableId");
    const data = {
      data: null,
      url: "/like/" + type + "/" + id,
    };
    console.log(data);

    return context.dispatch("post", data, { root: true });
  },
  dislike(context, payload) {
    const type = payload.get("likeableType");
    const id = payload.get("likeableId");
    const data = {
      data: null,
      url: "/dislike/" + type + "/" + id,
    };
    console.log(data);
    return context.dispatch("post", data, { root: true });
  },
};
