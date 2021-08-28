import React from "react";
import PropTypes from "prop-types";
import "./index.style.scss";
import { Link } from "react-router-dom";
import domains from "../../domains";
const steps = [
  { label: "Cart", domain: domains.cart },
  { label: "Shipping Address", domain: domains.shipping },
  { label: "Payment Method", domain: domains.payment },
  { label: "Place Order", domain: domains.confirmOrder },
];
export const Steps = ({ activeStep }) => {
  return (
    <div className="steps">
      {/* <div className="line" /> */}
      {steps.map((item, idx) => {
        return (
          <Link
            className="step"
            style={{ gridColumn: `${idx + 1} / span 1` }}
            key={idx}
            to={item.domain}
          >
            <div
              className={`line ${idx <= activeStep ? "line--active" : ""}`}
            />
            <div
              className={`circle ${idx < activeStep ? "circle--active" : ""}`}
            />
            <p>{item.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

Steps.defaultProps = {
  activeStep: 0,
};
Steps.propTypes = {
  activeStep: PropTypes.number.isRequired,
};
