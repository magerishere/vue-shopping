<template>
  <div class="mb-3">
    <label :for="id">{{ text }}</label>
    <select
      :id="id"
      v-model="model"
      class="form-select"
      :class="{ error: !isValid }"
      @blur="confirmErr"
    >
      <option v-for="option in options" :key="option[0]" :value="option">
        {{ option[1] }}
      </option>
    </select>
    <div v-if="!isValid" class="form-text-error">{{ errorMsg }}</div>
  </div>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: null,
      required: true,
    },
    id: {
      type: [Number, String],
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    text: {
      type: [Number, String],
      required: true,
    },
    isValid: {
      type: Boolean,
      required: true,
    },
    errorMsg: {
      type: String,
      required: true,
    },
    confirmErr: {
      type: Function,
      required: true,
    },
  },
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
