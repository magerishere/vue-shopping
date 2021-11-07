import { reactive } from "vue";
export default function formOptions() {
  const options = reactive({
    formIsValid: true,
    isLoading: false,
    errors: null,
  });

  return options;
}
