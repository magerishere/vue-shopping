<template>
  <base-card>
    <base-dialog
      :show="!!form.errors.messages"
      @close="form.errors.confirm"
      :messages="form.errors.messages"
    >
    </base-dialog>
    <header class="text-center">
      <h3>{{ title }}</h3>
    </header>
    <hr />
    <section>
      <div class="text-center mb-5">
        <img :src="image" alt="Blog Image" class="blog-image" loading="lazy" />
      </div>
      <p>
        {{ content }}
      </p>
      <div class="actions" v-if="isAuth">
        <span @click="like" class="like">
          <i :class="likeIconClass" aria-hidden="true"></i>
          <small>{{ likesCount }}</small>
        </span>
        <span @click="dislike" class="dislike">
          <i :class="dislikeIconClass" aria-hidden="true"></i>
          <small>{{ dislikesCount }}</small>
        </span>
      </div>
      <hr />
      <h6>نظرات</h6>
      <comments-list :comments="comments"></comments-list>
      <h6>نظر شما درباره این مطلب چیست؟</h6>

      <comment-create v-if="isAuth" type="Blog" :id="id"></comment-create>

      <h6 v-else class="text-center">
        برای نظردادن ابتدا وارد اکانت خود شوید

        <base-button link to="/auth/login" mode="small">ورود</base-button>
      </h6>
    </section>
  </base-card>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import CommentsList from "../comments/CommentsList.vue";
import CommentCreate from "../comments/CommentCreate.vue";
import useLikes from "@/hooks/useLikes";
export default {
  components: {
    CommentsList,
    CommentCreate,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
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
  },
  setup(props) {
    const data = {
      likeableType: {
        val: "Blog",
      },
      likeableId: {
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
      form,
    } = useLikes(props, data);

    const store = useStore();
    const isAuth = computed(() => {
      return store.getters["auth/isAuth"];
    });
    return {
      likesCount,
      isLike,
      like,
      likeIconClass,
      dislikesCount,
      isDislike,
      dislike,
      dislikeIconClass,
      form,
      isAuth,
    };
  },
};
</script>

<style scoped>
.blog-image {
  width: 80%;
  height: 250px;
}
.actions > * {
  margin: 0 0.3rem;
}
.like {
  cursor: pointer;
}

.dislike {
  cursor: pointer;
}
</style>
