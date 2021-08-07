import React from "react";
import PropTypes from "prop-types";
import { Message } from "../Message";
import "./index.style.scss";
export const Input = ({
  fieldName,
  type,
  value,
  label,
  id,
  blur,
  error,
  placeholder,
  onChange,
  onBlur,
}) => {
  return (
    <div className="input">
      {blur && error && <Message variant="error" message={error} />}
      <input
        className="input__field"
        placeholder={placeholder}
        id={id}
        name={fieldName}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id} className="input__label">
        {label}
      </label>
    </div>
  );
};

Input.defaultProps = {
  fieldName: "",
  type: "text",
  value: "",
  label: "",
  id: "",
  blur: false,
  error: "",
  placeholder: "",
  onChange: () => {},
  onBlur: () => {},
};
Input.propTypes = {
  fieldName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  blur: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
