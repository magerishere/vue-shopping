export default function errorsHandler(inputs, options) {
  function confirmErrors() {
    options.errors = null;
  }

  function confirmValidError(event) {
    inputs[event.target.id].isValid = true;
  }

  return { confirmErrors, confirmValidError };
}
