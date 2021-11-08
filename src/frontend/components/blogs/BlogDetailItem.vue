<template>
  <base-card>
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
      <div>
        <p>
          <span>
            <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
            <small>19</small>
          </span>
          <span>
            <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
            <small>19</small>
          </span>
        </p>
      </div>
      <hr />
      <h6>نظرات</h6>
      <blog-comments-list :comments="comments"></blog-comments-list>
      <h6>نظر شما درباره این مطلب چیست؟</h6>

      <blog-comment-create v-if="isAuth" :blogId="id"></blog-comment-create>

      <h6 v-else class="text-center">
        برای نظردادن ابتدا وارد اکانت خود شوید

        <base-button link to="/auth/login" mode="small">ورود</base-button>
      </h6>
    </section>
  </base-card>
</template>

<script>
import BlogCommentsList from "./comments/BlogCommentsList.vue";
import BlogCommentCreate from "./comments/BlogCommentCreate.vue";
export default {
  components: {
    BlogCommentsList,
    BlogCommentCreate,
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
  },
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    },
  },
};
</script>

<style scoped>
.blog-image {
  width: 80%;
  height: 250px;
}
</style>
