import { useState, useEffect } from "react";
export const useFormValidation = (
  initialValue = "",
  customValidate = () => {
    return { valid: true, error: "" };
  },
  message = ""
) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setValid] = useState(false);
  const [error, setError] = useState("");
  const [blur, setBlur] = useState(false);
  useEffect(() => {
    const obj = customValidate(value, message);
    if (obj?.valid) {
      setValid(true);
      setError("");
    } else {
      if (isValid !== false) {
        setValid(false);
      }
      if (error !== obj.error) {
        setError(obj.error);
      }
    }
  }, [value, blur]);

  return { value, error, blur, isValid, setValue, setError, setBlur };
};

export default useFormValidation;
