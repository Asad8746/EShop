import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrder, resetOrderAction } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  FullPageLoader,
  ProductItem,
  Message,
  PaypalContainer,
} from "../../Components";
import { fixedTo2 } from "../../utils/FixedDecimal";
import dayjs from "dayjs";
import "./index.style.scss";
export const OrderPage = () => {
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector((store) => store.order);
  const orderId = data._id;
  const user = data?.user;
  const shippingAddress = data?.shippingAddress;
  const orderItems = data?.orderItems || [];
  const paymentMethod = data?.paymentMethod;
  const { total_price, tax_price, delivery_price, isPaid, isDelivered } = data;
  const itemsTotal = orderItems.reduce(
    (prevTotal, item) => item.qty * item.price + prevTotal,
    0
  );
  useEffect(() => {
    dispatch(getOrder(id));
    return () => {
      dispatch(resetOrderAction());
    };
  }, [id, dispatch]);
  const renderPaymentMethod = () => {
    if (data.paymentMethod === "paypal") {
      return (
        <div className="order-summary__center-container">
          <PaypalContainer />
        </div>
      );
    } else if (data.paymentMethod === "stripe") {
      return (
        <div className="order-summary__center-container">
          <button>Stripe</button>
        </div>
      );
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
      ) : (
        <>
          <div className="order">
            <div className="order__left">
              <div className="order__container">
                <h2>User Details</h2>
                <p>
                  <span className="label">Order Id:</span>
                  {data._id}
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
                      ? `on ${dayjs(data.deliveredAt).format("DD-MM-YYYY")}`
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
                    {isPaid ? `Paid on ${data.paidAt}` : "Not Paid"}
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
              {error > 0 && (
                <>
                  <div className="order-summary__center-container">
                    <Message message={error} variant="error" />
                  </div>
                  <div className="line" />
                </>
              )}
              {!data.isPaid && renderPaymentMethod()}
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

OrderPage.propTypes = {};
