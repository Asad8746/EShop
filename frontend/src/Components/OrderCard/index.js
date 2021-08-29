import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.style.scss";
export const OrderCard = ({ order }) => {
  return (
    <Link className="order-card" to={`/order/${order._id}`}>
      <div className="order-card__value">
        <h2 className="order-card__value--label">Order Id</h2>
        <p> {order._id}</p>
        <div className="order-card__status-container">
          <div
            className={`order-card__status ${
              !order.isDelivered
                ? "order-card__not-delivered"
                : "order-card__delivered"
            } `}
          >
            {order.isDelivered ? "Delivered" : "Not Delivered"}
          </div>
          <div
            className={`order-card__status ${
              !order.isPaid ? "order-card__not-paid" : "order-card__paid"
            } `}
            style={{ order: -1 }}
          >
            {order.isPaid ? "Paid" : "Not Paid"}
          </div>
        </div>
      </div>
      <div className="order-card__value">
        <h2 className="order-card__value--label">Ordered on</h2>
        <p> {order.createdAt}</p>
      </div>
      <div className="order-card__value">
        <h2 className="order-card__value--label">Payment Method</h2>
        <p> {order.paymentMethod}</p>
      </div>

      {order.isPaid && (
        <div className="order-card__value">
          <h2 className="order-card__value--label">Paid on</h2>
          <p>{order.paidAt}</p>
        </div>
      )}
      {order.isDelivered && (
        <div className="order-card__value">
          <h2 className="order-card__value--label">Delivered on</h2>
          <p>{order.deliveredAt}</p>
        </div>
      )}

      <div className="order-card__value">
        <h2 className="order-card__value--label">Total</h2>
        <p>{order.total_price}</p>
      </div>
    </Link>
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
};
