<template>
  <ul>
    <comment-item
      v-for="comment in comments"
      :key="comment.id"
      :id="comment.id"
      :userName="comment.user.name"
      :body="comment.body"
      :created-at="comment.created_at"
      :likes="comment.likes"
      :dislikes="comment.dislikes"
      :replies="comment.replies"
    ></comment-item>
  </ul>
</template>

<script>
import CommentItem from "./CommentItem.vue";
export default {
  components: {
    CommentItem,
  },
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
};
</script>
