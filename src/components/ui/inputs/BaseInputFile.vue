<template>
  <div class="mb-3">
    <label :for="id" class="form-label">
      <slot>
        {{ text }}
      </slot>
    </label>
    <input
      type="file"
      :id="id"
      class="form-control"
      :class="{ error: !isValid }"
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
        return props.text + " " + "را بارگذاری کنید";
      },
    },
    confirmErr: {
      type: Function,
      required: true,
    },
  },
};
</script>
