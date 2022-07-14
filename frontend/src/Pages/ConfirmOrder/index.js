import React, { useState, useMemo } from "react";
import {
  Container,
  Steps,
  ProductItem,
  CustomLoader,
  Message,
} from "../../Components";
import "./index.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { fixedTo2 } from "../../utils/FixedDecimal";
import { createOrder } from "../../actions";
import { Redirect, useHistory } from "react-router-dom";
import domains from "../../domains";
export const ConfirmOrder = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cart = useSelector((store) => store.cart);
  const { address, city, postalCode, country } = cart.address;
  const itemsTotal = useMemo(
    () =>
      cart.items.reduce(
        (prevTotal, item) => item.qty * item.price + prevTotal,
        0
      ),
    [cart.items.length]
  );
  const redirectTo =
    cart.items.length === 0
      ? domains.cart
      : Object.keys(cart.address).length === 0
      ? domains.shipping
      : !cart.paymentMethod
      ? domains.payment
      : "";
  const totalTax = fixedTo2(itemsTotal * 0.1);
  const shippingPrice = fixedTo2(itemsTotal >= 200 ? 0 : 100);
  const total = fixedTo2(
    Number(itemsTotal) + Number(totalTax) + Number(shippingPrice)
  );
  const renderSummaryValue = (label, value) => {
    return (
      <>
        <div className="line" />
        <p className="order-summary__label">{label} </p>
        <p className="order-summary__value">${fixedTo2(value)}</p>
      </>
    );
  };
  const onPlaceOrderClick = () => {
    if (
      Object.keys(cart.address).length !== 0 &&
      cart.items.length !== 0 &&
      cart.paymentMethod
    ) {
      setLoading(true);
      dispatch(
        createOrder(
          {
            items: cart.items,
            paymentMethod: cart.paymentMethod,
            address: cart.address,
          },
          (errorStatus = "", id) => {
            if (errorStatus) {
              setError(errorStatus);
            } else {
              history.push(`/order/${id}`);
            }
          }
        )
      );
    }
  };
  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }
  return (
    <Container>
      <>
        <Steps activeStep={3} />

        <div className=" order ">
          <div className="order__left">
            <div className="order__container">
              <h2>Shipping Details</h2>
              <p>
                <span className="label">Address:</span> {address}
              </p>
              <p>
                <span className="label">City:</span> {city}
              </p>
              <p>
                <span className="label">Postal Code:</span> {postalCode}
              </p>
              <p>
                <span className="label">Country:</span> {country}
              </p>
            </div>
            <div className="order__container">
              <h2>Payment Method</h2>
              <p>
                <span className="label">Method you choosed:</span>
                {cart.paymentMethod}
              </p>
            </div>
            <div className="order__container">
              <h2>Order Items</h2>
              <div className="order__items">
                {cart.items.map((product) => {
                  return <ProductItem key={product.id} product={product} />;
                })}
              </div>
            </div>
          </div>
          <div className="order-summary">
            <h1 className="checkout__title">Order Summary</h1>
            {renderSummaryValue("sub total", itemsTotal)}
            {renderSummaryValue("Shipping", shippingPrice)}
            {renderSummaryValue("tax", totalTax)}
            {renderSummaryValue("total", total)}
            <div className="line" />
            {error && (
              <>
                <div className="order-summary__center-container">
                  <Message message={error} variant="error" />
                </div>
                <div className="line" />
              </>
            )}

            <div className="order-summary__center-container">
              {loading ? (
                <CustomLoader height={30} width={30} />
              ) : (
                <button className="btn--primary" onClick={onPlaceOrderClick}>
                  Place Order
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    </Container>
  );
};

ConfirmOrder.propTypes = {};
