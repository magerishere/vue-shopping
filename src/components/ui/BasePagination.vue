<template>
  <nav>
    <ul class="pagination justify-content-center">
      <li v-for="page in pages" :key="page">
        <base-button
          mode="page"
          :class="{ active: page.active }"
          @click="paginator(page.url)"
          >{{ page.label }}</base-button
        >
      </li>
    </ul>
  </nav>
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
      const queryParamPage = url.split("?")[1]; // page=7

      context.emit("paginator", queryParamPage);
    };

    return {
      paginator,
    };
  },
};
</script>
