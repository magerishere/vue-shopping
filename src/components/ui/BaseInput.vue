<template>
  <label :for="id"
    ><input :type="type" :id="id" :name="name" :value="id" @change="checked" />
    <span :class="spanClass"></span>
    {{ text }}
  </label>
</template>

<script>
import { computed, inject } from "vue";
export default {
  props: {
    modelValue: Array,
    text: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator(value) {
        return ["checkbox", "radio"].includes(value);
      },
    },
    id: {
      type: [Number, String],
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
  },

  setup(props) {
    const spanClass = computed(() => {
      if (props.type === "checkbox") {
        return "checkmark";
      } else {
        return "radio";
      }
    });

    const checked = inject("checkMarkInput", null);

    return { spanClass, checked };
  },
};
</script>

<style scoped>
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

.checkmark {
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 4px;
  right: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
}

.checkmark:after {
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

input[type="checkbox"]:checked ~ .checkmark:after {
  display: block;
}

/* radio */
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
