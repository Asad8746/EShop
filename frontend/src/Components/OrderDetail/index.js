import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "../Container";
import { FullPageLoader } from "../FullPageLoader";
import { ProductItem } from "../ProductItem";
import { Message } from "../Message";
import { PaypalContainer } from "../Paypal";
import { FullPageError } from "../FullPageError";
import { DeliveredButton } from "../DeliveredButton";
import { PaidButton } from "../PaidButton";
import { ReactComponent as NotFoundSvg } from "../../images/404.svg";
import { fixedTo2 } from "../../utils/FixedDecimal";
import { getAdminOrderDetail } from "../../actions";
import "./index.style.scss";

export const OrderDetail = ({ order, loading, error, isAdmin }) => {
  const [actionSuccess, setActionSuccess] = useState(false);
  const dispatch = useDispatch();
  const orderId = order._id;
  const user = order?.user;
  const shippingAddress = order?.shippingAddress;
  const orderItems = order?.orderItems || [];
  const paymentMethod = order?.paymentMethod;
  const { total_price, tax_price, delivery_price, isPaid, isDelivered } = order;
  const itemsTotal = orderItems.reduce(
    (prevTotal, item) => item.qty * item.price + prevTotal,
    0
  );
  useEffect(() => {
    if (actionSuccess) {
      dispatch(getAdminOrderDetail(orderId));
      setActionSuccess(false);
    }
  }, [actionSuccess]);
  const onSuccess = useCallback((responseData) => {
    if (responseData) {
      setActionSuccess(true);
    }
  }, []);
  const renderActions = () => {
    if (isAdmin) {
      return (
        <div className="order-summary__center-container order-summary__center-container--admin">
          <DeliveredButton
            id={orderId}
            label="Mark as Delivered"
            isDisabled={isDelivered === true}
            onSuccess={onSuccess}
          />
          <PaidButton
            id={orderId}
            label="Mark as Paid"
            isDisabled={isPaid === true || paymentMethod !== "cod"}
            onSuccess={onSuccess}
          />
        </div>
      );
    }
    if (!isPaid) {
      if (paymentMethod === "paypal") {
        return (
          <div className="order-summary__center-container">
            <PaypalContainer />
          </div>
        );
      } else if (paymentMethod === "stripe") {
        return (
          <div className="order-summary__center-container">
            <button>Stripe</button>
          </div>
        );
      }
      return <></>;
    }
    return <></>;
  };
  const renderSummaryValue = (label, value) => {
    return (
      <>
        <div className="line" />
        <p className="order-summary__label">{label} </p>
        <p className="order-summary__value">${fixedTo2(value)}</p>
      </>
    );
  };
  return (
    <Container>
      {loading ? (
        <div className="order__loader-container">
          <FullPageLoader />
        </div>
      ) : error ? (
        <FullPageError
          error={error}
          render={(className) => <NotFoundSvg className={className} />}
        />
      ) : (
        <>
          <div className="order">
            <div className="order__left">
              <div className="order__container">
                <h2>User Details</h2>
                <p>
                  <span className="label">Order Id:</span>
                  {orderId}
                </p>
                <p>
                  <span className="label">Name:</span>
                  {user.name}
                </p>
                <p>
                  <span className="label">Email:</span> {user?.email}
                </p>
              </div>
              <div className="order__container">
                <h2>Shipping Details</h2>
                <p>
                  <span className="label">Address:</span>
                  {shippingAddress?.address}
                </p>
                <p>
                  <span className="label">City:</span> {shippingAddress?.city}
                </p>
                <p>
                  <span className="label">Postal Code:</span>
                  {shippingAddress?.postalCode}
                </p>
                <p>
                  <span className="label">Country:</span>
                  {shippingAddress?.country}
                </p>

                <Message
                  variant={isDelivered ? "success" : ""}
                  message={`Your Order ${orderId} is ${
                    !isDelivered ? "not" : ""
                  } Delivered ${
                    isDelivered
                      ? `on ${dayjs(order.deliveredAt).format(
                          "DD-MM-YYYY-hh:mm"
                        )}`
                      : ""
                  } `}
                  customClassName={
                    isDelivered
                      ? "order__custom-success"
                      : "order__custom-error"
                  }
                />
              </div>
              <div className="order__container">
                <h2>Payment Method</h2>
                <p>
                  <span className="label">Method you choosed:</span>
                  {paymentMethod}
                </p>
                <p>
                  <span className="label">Paid Status</span>
                  <span
                    className={`${
                      isPaid ? "order__paid-status" : "order__not-paid-status"
                    }`}
                  >
                    {isPaid
                      ? `Paid on ${dayjs(order.paidAt).format(
                          "DD/MM/YYYY-hh:mm"
                        )}`
                      : "Not Paid"}
                  </span>
                </p>
              </div>
              <div className="order__container">
                <h2>Order Items</h2>
                <div className="order__items">
                  {orderItems.map((product) => {
                    return <ProductItem key={product.id} product={product} />;
                  })}
                </div>
              </div>
            </div>
            <div className="order-summary">
              <h1 className="checkout__title">Order Summary</h1>
              {renderSummaryValue("sub total", itemsTotal)}
              {renderSummaryValue("shipping", delivery_price)}
              {renderSummaryValue("tax", tax_price)}
              {renderSummaryValue("total", total_price)}
              <div className="line" />
              {renderActions()}
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

OrderDetail.defaultProps = {
  isAdmin: false,
};

OrderDetail.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string,
    total_price: PropTypes.number,
    tax_price: PropTypes.number,
    delivery_price: PropTypes.number,
    isPaid: PropTypes.bool,
    isDelivered: PropTypes.bool,
    paymentMethod: PropTypes.string,
    paidAt: PropTypes.string,
    deliveredAt: PropTypes.string,
    shippingAddress: PropTypes.shape({
      address: PropTypes.string,
      city: PropTypes.string,
      postalCode: PropTypes.string,
      country: PropTypes.string,
    }),
    orderItems: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        qty: PropTypes.number,
        price: PropTypes.number,
      })
    ),
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
};
