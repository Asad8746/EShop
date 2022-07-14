import React from "react";
import PropTypes from "prop-types";
import "./index.style.scss";

export const PaymentCard = ({ Icon, active, onClick, testId }) => {
  return (
    <div className="paymentcard" onClick={onClick} data-testid={testId}>
      {active && (
        <div
          className={`paymentcard__nactive ${
            active ? "paymentcard__active" : ""
          }`}
        />
      )}
      <div className="paymentcard__content">
        <Icon />
        {active && <i className="fas fa-check-circle"></i>}
      </div>
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
  testId: PropTypes.string,
};
