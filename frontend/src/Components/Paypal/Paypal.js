import React from "react";
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";
import { CustomLoader } from "../Loader";
import PropTypes from "prop-types";
const Paypal = ({ onCreateOrder, onApprove }) => {
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();
  if (isPending) return <CustomLoader height={20} width={20} />;
  return <PayPalButtons createOrder={onCreateOrder} onApprove={onApprove} />;
};

Paypal.defaultProps = {
  onCreateOrder: () => {},
  onApprove: () => {},
};
Paypal.propTypes = {
  onCreateOrder: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
};

export default Paypal;
