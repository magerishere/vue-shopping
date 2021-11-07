<template>
  <tr>
    <td>{{ id }}</td>
    <td>{{ title }}</td>
    <td><img :src="image" alt="Blog Image" /></td>
    <td>{{ content }}</td>
    <td><base-button link :to="editBlogLink">مشاهده</base-button></td>
  </tr>
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
