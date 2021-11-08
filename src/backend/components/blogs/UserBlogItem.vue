<template>
  <tr>
    <td>{{ id }}</td>
    <td>{{ title }}</td>
    <td><img :src="image" alt="Blog Image" loading="lazy" /></td>
    <td>{{ StringFormat(content, 70) }}</td>
    <td>
      <base-button link :to="editBlogLink" mode="small">مشاهده</base-button>
    </td>
  </tr>
</template>

<script>
export default {
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
  },
  computed: {
    editBlogLink() {
      return { name: "blogEdit", params: { id: this.id } };
    },
  },
};
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
}
</style>
