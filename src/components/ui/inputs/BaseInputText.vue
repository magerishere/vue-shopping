<template>
  <div class="mb-3">
    <label :for="id" class="form-label">
      <slot>{{ text }}</slot>
    </label>
    <input
      type="text"
      :id="id"
      v-model.trim="model"
      class="form-control"
      :class="classes"
      @blur="confirmErr"
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
      required: false,
    },
    isValid: {
      type: Boolean,
      required: true,
    },
    errorMsg: {
      type: String,
      required: false,
      default: (props) => {
        return props.text + " " + "را وارد کنید";
      },
    },
    confirmErr: {
      type: Function,
      required: true,
    },
    mode: {
      type: String,
      required: false,
      validator: (value) => {
        return ["rtl", "ltr"].includes(value);
      },
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
    classes: {
      get() {
        return { error: !this.isValid, ltr: this.mode === "ltr" };
      },
    },
  },
};
</script>

<style scoped>
.ltr {
  direction: ltr;
}
</style>
