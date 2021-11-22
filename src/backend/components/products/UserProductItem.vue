<template>
  <tr>
    <td>
      <BaseInputCheckbox :text="id" name="blog" :id="id" v-model="selectedId" />
      <!-- <BaseInput :text="id" type="checkbox" name="blog" :id="id" /> -->
    </td>

    <td><img :src="image" alt="Blog Image" loading="lazy" /></td>
    <td>{{ catName }}</td>
    <td>{{ title }}</td>
    <td>{{ stringFormat(content, 30) }}</td>
    <td class="actions">
      <base-button link :to="editBlogLink" mode="small">مشاهده</base-button>
    </td>
  </tr>
</template>

<script>
import { computed } from "vue";
export default {
  emits: ["update:modelValue"],
  inject: {
    stringFormat: {
      // helper function
      type: Function,
      required: true,
    },
  },
  props: {
    modelValue: {
      type: null,
      required: true,
    },
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
    const selectedId = computed({
      get: () => props.modelValue,
      set: (value) => context.emit("update:modelValue", value),
    });
    const editBlogLink = computed(() => {
      return { name: "productEdit", params: { id: props.id } };
    });

    return { editBlogLink, selectedId };
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
