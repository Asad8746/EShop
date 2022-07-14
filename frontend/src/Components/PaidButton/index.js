import React from "react";
import PropTypes from "prop-types";
import { markOrder } from "../../actions";
export function PaidButton({ id, label, isDisabled, onClick, onSuccess }) {
  const onBtnClick = (e) => {
    e.stopPropagation();
    onClick();
    markOrder(id, { isPaid: true }, onSuccess);
  };
  return (
    <button
      className="ui huge red button"
      onClick={onBtnClick}
      disabled={isDisabled}
    >
      {label ? label : "paid"}
    </button>
  );
}

PaidButton.defaultProps = {
  onClick: () => {},
  onSuccess: () => {},
  label: "Paid",
};
PaidButton.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  onSuccess: PropTypes.func,
  onClick: PropTypes.func,
};
