import React from "react";
import PropTypes from "prop-types";
import "./index.style.scss";

const areEqual = (props, nextProps) => {
  return props.message === nextProps.message;
};
// eslint-disable-next-line react/display-name
const MessageComponent = ({ variant, message, customClassName }) => {
  const messageClassName = `message ${
    variant === "error"
      ? "message--error"
      : variant === "success"
      ? "message--success"
      : "message--info"
  } ${customClassName}`;
  return <div className={messageClassName}>{message}</div>;
};

MessageComponent.defaultProps = {
  variant: "",
  message: "",
  customClassName: "",
};
MessageComponent.propTypes = {
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  customClassName: PropTypes.string.isRequired,
};

export const Message = React.memo(MessageComponent, areEqual);
