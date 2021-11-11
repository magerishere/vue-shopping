<template>
  <li class="col-md-4">
    <base-card>
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
  min-height: 50px;
}
.float-start > * {
  margin-left: 0.25rem;
}
</style>
