<template>
  <li class="col-md-4">
    <base-card>
      <img :src="image" class="card-img-top" alt="image top" />
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">
          {{ content }}
        </p>
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
</style>
