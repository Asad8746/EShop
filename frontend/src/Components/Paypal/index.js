import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getPaypalKey, updatePaidStatus } from "../../actions";

import { CustomLoader } from "../Loader";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Paypal from "./Paypal";

export const PaypalContainer = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const id = params?.id;
  const [loading, setLoading] = useState(true);
  const [clientId, setClientId] = useState("");
  const value = useSelector((store) => store.order.data.total_price);
  useEffect(() => {
    getPaypalKey((id) => {
      setClientId(id);
      setLoading(false);
    });
  }, []);
  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{ amount: { value } }],
    });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      dispatch(updatePaidStatus(id, details));
    });
  };
  if (loading) return <CustomLoader height={20} width={20} />;
  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <Paypal onCreateOrder={onCreateOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
};
