import React from "react";
import PropTypes from "prop-types";
import "./index.style.scss";

export const PaymentCard = ({ Icon, active, onClick }) => {
  return (
    <div className={`paymentcard ${active ? "active" : ""}`} onClick={onClick}>
      <Icon />
      {active && <i className="fas fa-check-circle"></i>}
    </div>
  );
};

PaymentCard.defaultProps = {
  active: false,
  onClick: () => {},
};

PaymentCard.propTypes = {
  Icon: PropTypes.func,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
