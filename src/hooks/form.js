import store from "@/store/index";
import useValidator from "./validator";
import useErrors from "./errors";
async function submitForm(
  data = null,
  dispatch,
  options,
  removeNullItems = false,
  withoutLoading = false
) {
  const validate = useValidator(data);
  if (!validate) {
    return;
  }
  if (!withoutLoading) {
    options.isLoading = true;
  }

  const formData = new FormData();
  for (const key in data) {
    // if file upload then append to form data
    if (data[key].isFile) {
      formData.append(key, data[key].val);
    } else {
      // array need to be json encode
      if (Array.isArray(data[key].val)) {
        formData.append(key, JSON.stringify(data[key].val));
      } else {
        if (removeNullItems) {
          if (data[key].val !== null) {
            // just only add items NOT null
            formData.append(key, data[key].val);
          }
        } else {
          // add everything number,null,string,etc...
          formData.append(key, data[key].val);
        }
      }
    }
  }
  try {
    await store.dispatch(dispatch, formData, options);
    options.done = true;
  } catch (err) {
    options.errors = err.message.split(",");
    options.done = false;
  }
  if (!withoutLoading) {
    options.isLoading = false;
  }
  const { confirmError, confirmValidError } = useErrors(data, options);
  return {
    options,
    confirmError,
    confirmValidError,
  };
}

export default submitForm;
