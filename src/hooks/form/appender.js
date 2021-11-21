export default function appender(data) {
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
        // add everything number,string,etc...
        if (data[key].val !== null) {
          formData.append(key, data[key].val);
        }
      }
    }
  }

  return formData;
}
