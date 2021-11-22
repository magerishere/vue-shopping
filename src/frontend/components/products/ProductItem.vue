<template>
  <li class="col-md-4">
    <base-card>
      <span class="badge badge-right">{{ catName }}</span>

      <span class="badge badge-left">{{ createdAt }}</span>
      <img :src="image" class="card-img-top" alt="image top" loading="lazy" />
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">
          {{ stringFormat(content, 100) }}
        </p>
        <div class="actions">
          <base-button
            ><i class="fa fa-cart-plus" aria-hidden="true"></i
          ></base-button>
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
  name: "ProductItem",
  inject: {
    stringFormat: {
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
      return "/product/" + this.id;
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
.actions {
  display: flex;
  justify-content: space-between;
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

img {
  height: 240px;
}
</style>
