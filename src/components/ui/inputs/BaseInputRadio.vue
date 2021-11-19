<template>
  <label :for="id">
    <input
      type="radio"
      :id="id"
      :value="id"
      class="radio"
      v-model.trim="model"
      :name="name"
    />
    <span class="radio"></span>
    {{ text }}
  </label>
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
    name: {
      type: String,
      required: false,
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

<style scoped>
label {
  cursor: pointer;
  margin-right: 1.5rem;
  font-size: 1rem;
}
input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio {
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 4px;
  right: 0;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
}

.radio:after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: -7px;
  width: 10px;
  height: 19px;
  border: solid darkviolet;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

input[type="radio"]:checked ~ .radio:after {
  display: block;
}
</style>
