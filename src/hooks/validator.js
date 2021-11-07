export default function formValidator(data) {
  let formIsValid = true;
  for (const key in data) {
    if (data[key].validate) {
      // required
      if (data[key].validate.required) {
        if (data[key].val === "" || data[key].val === null) {
          data[key].isValid = false;
          formIsValid = false;
        }
      }
      // type of email
      if (data[key].validate.email) {
        if (!data[key].val.includes("@")) {
          data[key].isValid = false;
          formIsValid = false;
        }
      }
      // max length
      if (data[key].validate.max) {
        if (data[key].val.length > data[key].validate.max) {
          data[key].isValid = false;
          formIsValid = false;
        }
      }
      // min length
      if (data[key].validate.min) {
        if (data[key].val.length < data[key].validate.min) {
          data[key].isValid = false;
          formIsValid = false;
        }
      }
    }
  }

  return formIsValid;
}
