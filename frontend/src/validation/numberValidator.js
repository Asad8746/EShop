export const numberValidator = (value, message) => {
  const convertedValue = Number(value);
  if (String(value).length === 0) {
    return { valid: false, error: message ? message : "Field is required" };
  } else if (isNaN(convertedValue)) {
    return { valid: false, error: "Please Enter a valid Number" };
  } else if (value < 0) {
    return {
      valid: false,
      error: message ? message : "Field must be greater than 0",
    };
  }
  return { valid: true, error: "" };
};
