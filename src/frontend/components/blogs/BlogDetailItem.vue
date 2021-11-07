<template>
  <base-card>
    <header class="text-center">
      <h3>{{ title }}</h3>
    </header>
    <hr />
    <section>
      <div class="text-center">
        <img :src="image" alt="Blog Image" />
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
    </section>
  </base-card>
</template>

<script>
export default {
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
};
</script>
