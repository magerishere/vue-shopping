<template>
  <div class="mb-3">
    <label :for="id" class="form-label">{{ text }}</label>
    <textarea
      :id="id"
      :cols="cols"
      :rows="rows"
      v-model="model"
      class="form-control"
      :class="{ error: !isValid }"
      @blur="confirmErr"
    ></textarea>
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
      type: [Number, String],
      required: true,
    },
    cols: {
      type: Number,
      required: false,
      default: 30,
    },
    rows: {
      type: Number,
      required: false,
      default: 10,
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
