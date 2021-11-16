<template>
  <div class="mb-3">
    <label :for="id" class="form-label">{{ text }}</label>
    <input
      type="password"
      :id="id"
      v-model="model"
      class="form-control"
      :class="{ error: !isValid }"
      @blur="confirmErr"
      autocomplete
    />
    <div v-if="!isValid" class="form-text-error">
      {{ errorMsg }}
    </div>
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
    text: {
      type: String,
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
