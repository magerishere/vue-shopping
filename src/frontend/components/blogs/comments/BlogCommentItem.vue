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
    </div>
    <base-dialog :show="!!options.errors" @close="confirmErrors">
      <p v-for="error in options.errors" :key="error">{{ error }}</p>
    </base-dialog>
    <div class="actions">
      <span v-if="isLike" class="like" @click="dislike"
        ><i class="fa fa-thumbs-up" aria-hidden="true"></i> {{ likes }}
      </span>
      <span v-else class="like" @click="like"
        ><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> {{ likes }}
      </span>

      <span v-if="isDislike" class="dislike"
        ><i class="fa fa-thumbs-down" aria-hidden="true"></i>
        {{ dislikes }}
      </span>
      <span v-else class="dislike"
        ><i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
        {{ dislikes }}
      </span>
    </div>
  </base-card>
</template>

<script>
import useForm from "@/hooks/form";
import useOptions from "@/hooks/options";
import useErrors from "@/hooks/errors";

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
      type: Number,
      required: true,
    },
    dislikes: {
      type: Number,
      required: true,
    },
    isLike: {
      type: Boolean,
      required: true,
    },
    isDislike: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const options = useOptions();
    const commentId = {
      val: props.id,
    };

    const like = () => {
      useForm({ commentId }, "comment/likeComment", options);
    };

    const dislike = () => {
      useForm(commentId, "comment/dislikeComment", options);
    };
    const { confirmErrors } = useErrors(null, options);

    return {
      like,
      dislike,
      confirmErrors,
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
  margin-right: auto;
  margin-top: 1rem;
}

.actions > * {
  margin: 0 0.5rem;
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
