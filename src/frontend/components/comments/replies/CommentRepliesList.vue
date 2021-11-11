<template>
  <ul>
    <comment-reply-item
      v-for="reply in replies"
      :key="reply.id"
      :id="reply.id"
      :user-name="reply.user.name"
      :body="reply.body"
      :likes="reply.likes"
      :dislikes="reply.dislikes"
      :created-at="reply.created_at"
    ></comment-reply-item>
  </ul>
</template>

<script>
import CommentReplyItem from "./CommentReplyItem.vue";
export default {
  components: {
    CommentReplyItem,
  },
  props: {
    replies: {
      type: Array,
      required: true,
    },
  },
};
</script>
