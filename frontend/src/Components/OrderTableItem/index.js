import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { markOrder } from "../../actions";
export const OrderTableItem = ({ order }) => {
  const initialPaidValue = order.isPaid ? "yes" : "no";
  const initialDeliveredValue = order.isDelivered ? "yes" : "no";
  const [paidStatus, setPaidStatus] = useState(initialPaidValue);
  const [deliveredStatus, setDeliveredStatus] = useState(initialDeliveredValue);
  const onOrderStatusChange = (data, cb) => {
    markOrder(order._id, data, cb);
  };
  useEffect(() => {
    if (typeof paidStatus !== "string") {
      onOrderStatusChange({ isPaid: paidStatus }, (data) => {
        if (data.isPaid && data.isPaid !== paidStatus) {
          setPaidStatus(data.isPaid);
        }
      });
    }
  }, [paidStatus]);
  useEffect(() => {
    if (typeof deliveredStatus !== "string") {
      onOrderStatusChange(
        {
          isDelivered: deliveredStatus,
        },
        (data) => {
          if (data.isDelivered && data.isDelivered !== deliveredStatus) {
            setPaidStatus(data.isDelivered);
          }
        }
      );
    }
  }, [deliveredStatus]);
  return (
    <tr key={order._id}>
      <td className="center aligned admin__table-item--bold">{order._id}</td>
      <td className="center aligned admin__table-item--bold admin__table-item">
        {order.user.name}
      </td>
      <td className="center aligned admin__table-item--bold">
        {order.total_price}
      </td>
      <td className="center aligned admin__table-item--bold admin__table-item">
        <div className="ui fitted slider checkbox">
          <input
            type="checkbox"
            checked={deliveredStatus === "yes" || deliveredStatus === true}
            onChange={(e) => {
              setDeliveredStatus(e.target.checked);
            }}
          />
          <label></label>
        </div>
      </td>
      <td className="center aligned">
        {order.paymentMethod === "cod" ? (
          <div className="ui fitted slider checkbox">
            <input
              type="checkbox"
              checked={paidStatus === "yes" || paidStatus === true}
              onChange={(e) => {
                setPaidStatus(e.target.checked);
              }}
            />
            <label></label>
          </div>
        ) : (
          initialPaidValue
        )}
      </td>
      <td className="center aligned admin__table-item admin__table-item--bold">
        {order.paymentMethod}
      </td>

      <td className="center aligned admin__table-item--bold">
        {dayjs(order.createdAt).format("YYYY-MM-DD")}
      </td>
    </tr>
  );
};

OrderTableItem.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    total_price: PropTypes.number.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    isDelivered: PropTypes.bool.isRequired,
    isPaid: PropTypes.bool.isRequired,
  }),
};
