import store from "@/store/index";
import useValidator from "./validator";
import useErrors from "./errors";
async function submitForm(data = null, dispatch, options) {
  const validate = useValidator(data);
  if (!validate) {
    return;
  }
  options.isLoading = true;
  const formData = new FormData();
  for (const key in data) {
    if ("isFile" in data[key] && data[key].isFile) {
      formData.append(key, data[key].val);
    } else if (!("isFile" in data[key])) {
      formData.append(key, data[key].val);
    }
  }
  try {
    await store.dispatch(dispatch, formData);
  } catch (err) {
    options.errors = err.message.split(",");
  }

  options.isLoading = false;

  return useErrors(data, options);
}

export default submitForm;
