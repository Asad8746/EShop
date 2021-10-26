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
  required,
}) => {
  const onInputBlur = () => {
    if (!blur) {
      onBlur(true);
    }
  };
  return (
    <div className="input">
      <div className="input__field-container">
        {type === "textarea" ? (
          <textarea
            className="input__field input__textarea"
            placeholder={placeholder}
            id={id}
            name={fieldName}
            required={required}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onInputBlur}
            rows={5}
          />
        ) : (
          <input
            className="input__field"
            placeholder={placeholder}
            id={id}
            name={fieldName}
            required={required}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onInputBlur}
          />
        )}
        <label htmlFor={id} className="input__label">
          {label}
        </label>
      </div>
      {blur && error && <Message variant="error" message={error} />}
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
  required: false,
};
Input.propTypes = {
  fieldName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  blur: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  required: PropTypes.bool,
};
