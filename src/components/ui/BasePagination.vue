<template>
  <transition appear name="pagination">
    <nav class="mt-5">
      <ul class="pagination justify-content-center">
        <li v-for="page in pages" :key="page">
          <base-button
            mode="page"
            :class="{ active: page.active }"
            :disabled="!page.url || page.active"
            @click="paginator(page.url)"
            v-html="page.label"
          >
          </base-button>
        </li>
      </ul>
    </nav>
  </transition>
</template>

<script>
export default {
  name: "BasePagination",
  props: {
    pages: {
      type: Array,
      required: true,
    },
  },
  setup(_, context) {
    const paginator = (url) => {
      console.log(url);
      const queryParamPage = url.split("?")[1]; // page=7

      context.emit("paginator", queryParamPage);
    };

    return {
      paginator,
    };
  },
};
</script>

<style scoped>
.pagination-enter-from {
  opacity: 0;
}

.pagination-enter-active {
  transition: all 1s ease;
}

.pagination-enter-to {
  opacity: 1;
}
</style>
