import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Steps, Container, PaymentCard } from "../../Components";
import { ReactComponent as CodSvg } from "../../images/cod.svg";
import { ReactComponent as PaypalSvg } from "../../images/paypal.svg";
import { savePaymentMethodAction } from "../../actions";
import domains from "../../domains";
import "./index.style.scss";

export const PaymentMethod = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((store) => store.cart);
  const initMethod = useSelector((store) => store.cart.paymentMethod);
  const [activeMethod, setActive] = useState(initMethod ? initMethod : "cod");
  const redirectTo =
    cart.items.length === 0
      ? domains.cart
      : Object.keys(cart.address).length === 0
      ? domains.shipping
      : "";
  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }
  const onClick = () => {
    if (activeMethod !== initMethod) {
      dispatch(savePaymentMethodAction(activeMethod));
    }
    history.push(domains.confirmOrder);
  };
  return (
    <Container>
      <>
        <Steps activeStep={2} />

        <div className="checkout__container">
          <h1 className="checkout__title">Select Payment Method</h1>
          <div className="payment__methods">
            <PaymentCard
              Icon={() => (
                <>
                  <CodSvg fill={activeMethod === "cod" ? "white" : "#1d3557"} />
                </>
              )}
              active={activeMethod === "cod"}
              onClick={() =>
                setActive((prev) => {
                  if (prev !== "cod") return "cod";
                  return prev;
                })
              }
            />
            <PaymentCard
              Icon={() => <PaypalSvg />}
              active={activeMethod === "paypal"}
              onClick={() =>
                setActive((prev) => {
                  if (prev !== "paypal") return "paypal";
                  return prev;
                })
              }
            />
          </div>
          <div className="btn__center-container">
            <button className="btn--primary" onClick={onClick}>
              Continue
            </button>
          </div>
        </div>
      </>
    </Container>
  );
};
