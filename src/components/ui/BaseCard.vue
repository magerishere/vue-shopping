<template>
  <div class="card" :class="mode">
    <slot name="nav"> </slot>
    <h1>{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseCard",
  props: {
    title: {
      type: String,
      required: false,
    },
    mode: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
.card {
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  margin: 2rem 0;
}

h1 {
  text-align: center;
}

.flat {
  max-width: 40rem;
  margin: 2rem auto;
}
</style>
