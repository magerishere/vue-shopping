<template>
  <li class="col-md-4">
    <base-card>
      <span class="badge badge-right">{{ catName }}</span>

      <span class="badge badge-left">{{ createdAt }}</span>
      <img :src="image" class="card-img-top" alt="image top" loading="lazy" />
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">
          {{ StringFormat(content, 100) }}
        </p>
        <div class="float-start">
          <span><i class="fa fa-eye"></i>{{ views }}</span>
          <span><i class="fa fa-thumbs-up"></i>{{ likes }}</span>
          <span><i class="fa fa-comments"></i>{{ comments }}</span>
        </div>
        <div class="float-end">
          <base-button link :to="readMoreLink" mode="small"
            >ادامه مطلب</base-button
          >
        </div>
      </div>
    </base-card>
  </li>
</template>

<script>
export default {
  name: "BlogItem",
  inject: {
    StringFormat: {
      // helper function
      type: Function,
      required: true,
    },
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    catName: {
      type: String,
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
    views: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    comments: {
      type: Number,
      required: true,
    },
  },
  computed: {
    readMoreLink() {
      return "/blog/" + this.id;
    },
  },
};
</script>

<style scoped>
li .card {
  min-height: 450px;
}
.card-text {
  min-height: 120px;
}
.float-start > * {
  margin-left: 0.25rem;
}
.badge {
  padding: 0.25rem 0.5rem;
  position: absolute;
  margin-top: 0.5rem;
}
.badge.badge-right {
  right: 0;
  margin-right: 1rem;
  background-color: darkviolet;
}
.badge.badge-left {
  left: 0;
  margin-left: 1rem;
  background-color: #000;
}

.blog-enter-from,
.blog-leave-to {
  opacity: 0;
}

.blog-enter-active {
  transition: all 1s ease-out;
}

.blog-leave-active {
  transition: all 1s ease-in;
}

.blog-enter-to,
.blog-leave-from {
  opacity: 1;
}

img {
  height: 240px;
}
</style>
