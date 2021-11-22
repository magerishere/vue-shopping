<template>
  <base-card>
    <base-dialog
      :show="!!form.errors.messages"
      @close="form.errors.confirm"
      :messages="form.errors.messages"
    >
    </base-dialog>
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
      <base-button v-if="!replyBox" mode="small outline" @click="openReplyBox"
        >پاسخ <i class="fa fa-reply" aria-hidden="true"></i
      ></base-button>
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

    <comment-reply-create
      v-if="replyBox"
      :comment-id="id"
    ></comment-reply-create>
    <comment-replies-list :replies="replies"></comment-replies-list>
  </base-card>
</template>

<script>
import { ref } from "vue";
import useLikes from "@/hooks/useLikes";
import CommentReplyCreate from "./replies/CommentReplyCreate.vue";
import CommentRepliesList from "./replies/CommentRepliesList.vue";

export default {
  components: {
    CommentReplyCreate,
    CommentRepliesList,
  },
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
    createdAt: {
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
    replies: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    // likes
    const {
      likesCount,
      isLike,
      like,
      likeIconClass,
      dislikesCount,
      isDislike,
      dislike,
      dislikeIconClass,
      form,
    } = useLikes(props, data, "comment/likeComment", "comment/dislikeComment");

    const replyBox = ref(null);

    function openReplyBox() {
      replyBox.value = true;
      form.config.done = false;
    }

    const data = {
      commentId: {
        val: props.id,
      },
    };
    return {
      likesCount,
      like,
      isLike,
      likeIconClass,
      form,
      dislikesCount,
      dislike,
      isDislike,
      dislikeIconClass,
      replyBox,
      openReplyBox,
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
