import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { CustomLoader } from "../Loader";
import { DeliveredButton } from "../DeliveredButton";
import { PaidButton } from "../PaidButton";
import "./index.style.scss";
export const OrderCard = ({ order, showActions, url }) => {
  const [actionLoader, setActionLoader] = useState(false);
  const [isDelivered, setDeliveredStatus] = useState(order.isDelivered);
  const [deliveredDate, setDeliveredDate] = useState(order.deliveredAt || null);
  const [isPaid, setPaidStatus] = useState(order.isPaid);
  const [paidDate, setPaidDate] = useState(order.paidAt || null);
  const history = useHistory();
  const renderStatusUI = (customClass = "") => {
    return (
      <div
        className={`order-card__status-container order-card__status-container--${customClass}`}
      >
        <div
          className={`order-card__status ${
            !isDelivered ? "order-card__not-delivered" : "order-card__delivered"
          } `}
        >
          {isDelivered ? "Delivered" : "Not Delivered"}
        </div>
        <div
          className={`order-card__status ${
            !isPaid ? "order-card__not-paid" : "order-card__paid"
          } `}
          style={{ order: -1 }}
        >
          {isPaid ? "Paid" : "Not Paid"}
        </div>
      </div>
    );
  };
  const onCardClick = () => {
    if (url) {
      history.push(`${url}/${order._id}`);
      return;
    }
    history.push(`/order/${order._id}`);
    return;
  };
  const onActionClick = React.useCallback(() => {
    setActionLoader(true);
  }, []);
  const ondeliverSuccess = React.useCallback((responseData, error) => {
    setActionLoader(false);
    if (responseData) {
      setDeliveredStatus(true);
      setDeliveredDate(responseData.deliveredAt);
    }
  }, []);
  const onPaidSuccess = React.useCallback((responseData, error) => {
    setActionLoader(false);
    if (responseData) {
      setPaidStatus(true);
      setPaidDate(responseData.paidAt);
    }
  });

  return (
    <div className="order-card " onClick={onCardClick}>
      {actionLoader ? (
        <div className="order-card__loader-container">
          <CustomLoader height={30} width={30} />
        </div>
      ) : null}

      <div className="order-card__value">
        <h2 className="order-card__value--label">Order Id</h2>
        <p> {order._id}</p>
        {renderStatusUI("large-screen")}
      </div>
      <div className="order-card__value">
        <h2 className="order-card__value--label">Ordered on</h2>
        <p> {dayjs(order.createdAt).format("DD-MM-YYYY")}</p>
      </div>
      <div className="order-card__value">
        <h2 className="order-card__value--label">Payment Method</h2>
        <p> {order.paymentMethod}</p>
      </div>
      <div className="order-card__value">
        <h2 className="order-card__value--label">Paid on</h2>
        {isPaid && <p>{dayjs(paidDate).format("DD-MM-YYYY")}</p>}
      </div>

      <div className="order-card__value">
        <h2 className="order-card__value--label">Delivered on</h2>
        {isDelivered && <p>{dayjs(deliveredDate).format("DD-MM-YYYY")}</p>}
      </div>

      <div className="order-card__value">
        <h2 className="order-card__value--label">Total</h2>
        <p>{order.total_price}</p>
      </div>
      {renderStatusUI("small-screen")}
      {showActions && (
        <div className="order-card__actions">
          <h2 className="order-card__actions-heading">Mark Order as</h2>
          <div className="order-card__actions-btns">
            <DeliveredButton
              id={order._id}
              isDisabled={isDelivered === true}
              onSuccess={ondeliverSuccess}
              onClick={onActionClick}
            />
            <PaidButton
              id={order._id}
              isDisabled={isPaid === true || order.paymentMethod !== "cod"}
              onSuccess={onPaidSuccess}
              onClick={onActionClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isDelivered: PropTypes.bool.isRequired,
    isPaid: PropTypes.bool.isRequired,
    total_price: PropTypes.number.isRequired,
    paidAt: PropTypes.string,
    deliveredAt: PropTypes.string,
    paymentMethod: PropTypes.string.isRequired,
  }),
  showActions: PropTypes.bool.isRequired,
  url: PropTypes.string,
};
