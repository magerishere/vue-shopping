<template>
  <tr>
    <td>
      <BaseInput :text="id" type="checkbox" name="blog" :id="id" />
    </td>

    <td><img :src="image" alt="Blog Image" loading="lazy" /></td>
    <td>{{ catName }}</td>
    <td>{{ title }}</td>
    <td>{{ StringFormat(content, 30) }}</td>
    <td class="actions">
      <base-button link :to="editBlogLink" mode="small">مشاهده</base-button>
      <base-button mode="danger flat small" @click="removeBlog(id)"
        >حذف</base-button
      >
    </td>
  </tr>
</template>

<script>
import { computed } from "vue";
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
  },
  setup(props, context) {
    const editBlogLink = computed(() => {
      return { name: "blogEdit", params: { id: props.id } };
    });

    const removeBlog = () => {
      context.emit("remove-blog", props.id);
    };

    return { editBlogLink, removeBlog };
  },
};
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
}

.actions > * {
  margin: 0 0.25rem;
}

td {
  position: relative;
}
</style>
