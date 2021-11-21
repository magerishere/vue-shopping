export default function useValidator(data) {
  let formIsValid = true;
  for (const key in data) {
    if (data[key].validate) {
      // required
      if (data[key].validate.required) {
        // array data
        if (Array.isArray(data[key].val) && data[key].val.length === 0) {
          data[key].isValid = false;
          data[key].validate.message = data[key].text + " " + "را وارد کنید";
          formIsValid = false;
          // string & number data
        } else if (data[key].val === "" || data[key].val === null) {
          data[key].isValid = false;
          data[key].validate.message = data[key].text + " " + "را وارد کنید";
          formIsValid = false;
        }
      }
      // type of email
      if (data[key].validate.email) {
        if (data[key].val && !data[key].val.includes("@")) {
          data[key].isValid = false;
          data[key].validate.message = data[key].text + " " + "معتبر وارد کنید";
          formIsValid = false;
        }
      }
      // max length
      if (data[key].validate.max && data[key].val) {
        if (data[key].val.length > data[key].validate.max) {
          data[key].isValid = false;
          data[key].validate.message =
            "بیشتر از" + " " + data[key].validate.max + " " + "کاراکتر نباشد";
          formIsValid = false;
        }
      }
      // min length
      if (data[key].validate.min && data[key].val) {
        if (data[key].val.length < data[key].validate.min) {
          data[key].isValid = false;
          data[key].validate.message =
            "کمتر از" + " " + data[key].validate.min + " " + "کاراکتر نباشد";
          formIsValid = false;
        }
      }
    }
  }

  return formIsValid;
}
