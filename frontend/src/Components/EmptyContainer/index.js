import React from "react";
import PropTypes from "prop-types";
import "./index.style.scss";
export function EmptyContainer({ message }) {
  return (
    <div className="empty-container">
      <p className="empty-container__message">{message}</p>
    </div>
  );
}

EmptyContainer.propTypes = {
  message: PropTypes.string.isRequired,
};
