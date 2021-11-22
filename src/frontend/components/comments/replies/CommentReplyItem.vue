<template>
  <base-card>
    <div class="d-flex">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Books_HD_%288314929977%29.jpg/640px-Books_HD_%288314929977%29.jpg"
        alt=""
        loading="lazy"
      />
      <h5 class="comment-username">
        {{ userName }}

        <p>
          {{ body }}
        </p>
      </h5>
      <small class="ms-auto">{{ createdAt }}</small>
    </div>
    <div class="actions">
      <div class="ms-auto">
        <span class="like" @click="like"
          ><i :class="likeIconClass" aria-hidden="true"></i> {{ likesCount }}
        </span>

        <span class="dislike" @click="dislike"
          ><i :class="dislikeIconClass" aria-hidden="true"></i>
          {{ dislikesCount }}
        </span>
      </div>
    </div>
  </base-card>
</template>

<script>
import useLikes from "@/hooks/useLikes";
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      required: true,
    },
    dislikes: {
      type: Array,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const replyData = {
      commentReplyId: {
        val: props.id,
      },
    };

    const {
      likesCount,
      isLike,
      like,
      likeIconClass,
      dislikesCount,
      isDislike,
      dislike,
      dislikeIconClass,
      options,
    } = useLikes(
      props,
      replyData,
      "comment/likeCommentReply",
      "comment/dislikeCommentReply"
    );

    return {
      likesCount,
      isLike,
      like,
      likeIconClass,
      dislikesCount,
      isDislike,
      dislike,
      dislikeIconClass,
      options,
    };
  },
};
</script>
<style scoped>
img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 1rem;
}

.actions {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
}

.comment-username p {
  font-size: 1rem;
}

.like {
  cursor: pointer;
}

.dislike {
  cursor: pointer;
}
</style>
