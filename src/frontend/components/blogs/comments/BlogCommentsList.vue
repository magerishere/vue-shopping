<template>
  <ul>
    <blog-comment-item
      v-for="comment in comments"
      :key="comment.id"
      :id="comment.id"
      :userName="comment.user.name"
      :body="comment.body"
      :likes="comment.likes.length"
      :dislikes="comment.dislikes.length"
      :isLike="comment.likes.findIndex((like) => like.user_id == userId) >= 0"
      :isDislike="
        comment.dislikes.findIndex((dislike) => dislike.user_id == userId) >= 0
      "
    ></blog-comment-item>
  </ul>
</template>

<script>
import BlogCommentItem from "./BlogCommentItem.vue";
export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      userId: localStorage.getItem("userId"),
    };
  },

  components: {
    BlogCommentItem,
  },
};
</script>
