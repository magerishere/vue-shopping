<template>
  <router-link v-if="link" :to="to" :class="mode">
    <slot></slot>
  </router-link>
  <button v-else :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: [String, Object],
      required: false,
      default: "/",
    },
    mode: {
      type: String,
      required: false,
      validator(value) {
        return ["outline", "small"].includes(value);
      },
    },
  },
};
</script>

<style scoped>
button {
  border-radius: 12px;
  background-color: darkviolet;
  border: 1px solid darkviolet;
  color: #fff;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
}

button:hover {
  background-color: #fff;
  color: darkviolet;
}

a {
  text-decoration: none;
  color: #fff;
  font-size: 1.25rem;
  padding: 0.5rem;
  background-color: darkviolet;
  border: 1px solid darkviolet;
}

a:hover,
a:active,
a.router-link-active {
  background-color: #fff;
  color: darkviolet;
}

.outline {
  background-color: #fff;
  color: darkviolet;
}

.outline:hover {
  background-color: darkviolet;
  color: #fff;
}

.small {
  background-color: #fff;
  color: darkviolet;
  padding: 0.3rem;
  font-size: 1rem;
}

.small:hover {
  background-color: darkviolet;
  color: #fff;
}
</style>
