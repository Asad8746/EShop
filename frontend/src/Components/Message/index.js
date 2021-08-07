import React from "react";
import PropTypes from "prop-types";
import "./index.style.scss";
export const Message = ({ variant, message }) => {
  const messageClassName = `message ${
    variant === "error"
      ? "message--error"
      : variant === "success"
      ? "message--success"
      : "message--info"
  }`;
  return <div className={messageClassName}>{message}</div>;
};

Message.defaultProps = {
  variant: "",
  message: "",
};
Message.propTypes = {
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
