import { useStore } from "vuex";
import validator from "./validator";
import useConfig from "./config";
import useErrors from "./errors";
import appender from "./appender";

export default function useForm() {
  const store = useStore();
  const errors = useErrors();
  const config = useConfig();
  // when submit form
  const submit = async (type, data, customConfig = null) => {
    // for confirm valid error
    errors.data = data;
    // validation data
    const formIsValid = validator(data);
    // if validation fails
    if (!formIsValid) {
      return;
    }
    if (customConfig) {
      Object.assign(config, customConfig);
    }
    console.log(config);
    // append data after validate
    const formData = appender(data);
    config.isLoading = true;
    try {
      await store.dispatch(type, formData);
      if (config.done) {
        config.done = true;
      }
      // success code
    } catch (err) {
      errors.messages = err.message.split(",");
      // errors code
      if (config.done) {
        config.done = false;
      }
    }
    config.isLoading = false;
  };

  return { submit, config, errors };
}
