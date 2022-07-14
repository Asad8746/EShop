import React from "react";
import PropTypes from "prop-types";
import { markOrder } from "../../actions";
export function DeliveredButton({ id, isDisabled, onClick, onSuccess }) {
  //   const adminRequest = (data, cb) => {
  //     setActionLoader(true);
  //     markOrder(order._id, data, (responseData, error) => {
  //       setActionLoader(false);
  //       cb(responseData, error);
  //     });
  //   };
  const onBtnClick = (e) => {
    e.stopPropagation();
    onClick();
    markOrder(id, { isDelivered: true }, onSuccess);
  };
  return (
    <button
      className="ui huge blue button"
      onClick={onBtnClick}
      disabled={isDisabled}
    >
      Delivered
    </button>
  );
}

DeliveredButton.defaultProps = {
  onClick: () => {},
  onSuccess: () => {},
};
DeliveredButton.propTypes = {
  id: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func,
  onClick: PropTypes.func,
};
