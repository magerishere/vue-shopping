<template>
  <label :for="labelFor"
    ><input
      :type="inputType"
      :id="inputId"
      :name="inputName"
      @change="changeAction"
      :checked="inputChecked"
    />
    <span :class="spanClass"></span>
    {{ labelText }}
  </label>
</template>

<script>
import { computed } from "vue";
export default {
  emits: ["change-action"],

  props: {
    labelFor: {
      type: String,
      required: true,
    },
    labelText: {
      type: String,
      required: true,
    },
    inputType: {
      type: String,
      required: true,
      validator(value) {
        return ["checkbox", "radio"].includes(value);
      },
    },
    inputId: {
      type: String,
      required: true,
    },
    inputName: {
      type: String,
      required: true,
    },
    inputChecked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, context) {
    const spanClass = computed(() => {
      if (props.inputType === "checkbox") {
        return "checkmark";
      } else {
        return "radio";
      }
    });

    function changeAction(event) {
      context.emit("change-action", event);
    }

    return { spanClass, changeAction };
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
