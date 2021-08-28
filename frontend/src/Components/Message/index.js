import React from "react";
import PropTypes from "prop-types";
import "./index.style.scss";
export const Message = ({ variant, message, customClassName }) => {
  const messageClassName = `message ${
    variant === "error"
      ? "message--error"
      : variant === "success"
      ? "message--success"
      : "message--info"
  } ${customClassName}`;
  return <div className={messageClassName}>{message}</div>;
};

Message.defaultProps = {
  variant: "",
  message: "",
  customClassName: "",
};
Message.propTypes = {
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  customClassName: PropTypes.string.isRequired,
};
