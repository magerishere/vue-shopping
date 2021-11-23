export default function useValidator(data) {
  let formIsValid = true;
  for (const key in data) {
    if (data[key].validate) {
      for (const validKey in data[key].validate) {
        switch (validKey) {
          case "required":
            console.log("required");

            // array data
            if (Array.isArray(data[key].val) && data[key].val.length === 0) {
              data[key].isValid = false;

              data[key].validate.message =
                data[key].text + " " + "را وارد کنید";

              formIsValid = false;
              // string & number data
            } else if (data[key].val === "" || data[key].val === null) {
              data[key].isValid = false;

              data[key].validate.message =
                data[key].text + " " + "را وارد کنید";

              formIsValid = false;
            }
            break;
          case "number":
            if (data[key].isValid) {
              if (!Number.isInteger(data[key].val)) {
                data[key].isValid = false;

                data[key].validate.message = "فقط عدد وارد کنید";

                formIsValid = false;
              }
            }
            break;
          // email validate
          case "email":
            if (data[key].isValid) {
              if (data[key].val && !data[key].val.includes("@")) {
                data[key].isValid = false;

                data[key].validate.message =
                  data[key].text + " " + "معتبر وارد کنید";

                formIsValid = false;
              }
            }
            break;
          // max length
          case "max":
            if (data[key].isValid) {
              if (
                data[key].val &&
                data[key].val.toString().length > data[key].validate.max
              ) {
                data[key].isValid = false;

                data[key].validate.message =
                  "بیشتر از" +
                  " " +
                  data[key].validate.max +
                  " " +
                  "کاراکتر نباشد";

                formIsValid = false;
              }
            }
            break;
          // min length
          case "min":
            if (data[key].isValid) {
              if (
                data[key].val &&
                data[key].val.toString().length < data[key].validate.min
              ) {
                data[key].isValid = false;

                data[key].validate.message =
                  "کمتر از" +
                  " " +
                  data[key].validate.min +
                  " " +
                  "کاراکتر نباشد";

                formIsValid = false;
              }
            }
            break;
          case "equal":
            if (data[key].isValid) {
              if (
                data[key].val &&
                data[key].val.toString().length !== data[key].validate.equal
              ) {
                console.log("is not euqal");
                data[key].isValid = false;

                data[key].validate.message =
                  "باید" +
                  " " +
                  data[key].validate.equal +
                  " " +
                  "کاراکتر باشد";

                formIsValid = false;
              }
              console.log("is euqal");
            }
            break;
          default:
            console.log(
              "you forgot break or case for validation form - please check your validator.js"
            );
            break;
        }
      }
    }
  }

  return formIsValid;
}
