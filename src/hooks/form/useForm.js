import { useStore } from "vuex";
import validator from "./validator";
import config from "./config";
import useErrors from "./errors";
import appender from "./appender";

export default function useForm() {
  const store = useStore();
  const errors = useErrors();

  // when submit form
  const submit = async (type, data) => {
    // for confirm valid error
    errors.data = data;
    // validation data
    const formIsValid = validator(data);
    // if validation fails
    if (!formIsValid) {
      return;
    }
    // append data after validate
    const formData = appender(data);
    config.isLoading = true;
    try {
      await store.dispatch(type, formData);
      // success code
    } catch (err) {
      errors.messages = err.message.split(",");
      // errors code
    }
    config.isLoading = false;
  };

  return { submit, config, errors };
}
