import { reactive } from "vue";

const useErrors = () => {
  const errors = reactive({
    formIsValid: false,
    messages: null,
    confirm: () => (errors.messages = null),
    data: null,
    confirmValid: (event) => {
      if (errors.data && errors.data[event.target.id]) {
        errors.data[event.target.id].isValid = true;
      }
    },
  });
  return errors;
};

export default useErrors;
