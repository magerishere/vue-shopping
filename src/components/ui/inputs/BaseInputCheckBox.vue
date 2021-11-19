<template>
  <div>
    <label :for="id">
      <input
        type="checkbox"
        :id="id"
        :name="name"
        :value="id"
        class="checkbox"
        v-model.trim="model"
      />
      <span class="checkbox"></span>
      {{ text }}
    </label>
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
div {
  position: relative;
}
label {
  cursor: pointer;
  margin-right: 1.5rem;
  font-size: 1rem;
}
input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox {
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 4px;
  right: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
}

.checkbox:after {
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

input[type="checkbox"]:checked ~ .checkbox:after {
  display: block;
}
</style>
