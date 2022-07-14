import React from "react";
import PropTypes from "prop-types";
import { OrderCard } from "../OrderCard";
import { EmptyContainer } from "../EmptyContainer";
import { Message } from "../Message";
import { FullPageLoader } from "../FullPageLoader";
export function OrderList({ data, error, loading, url, showActions }) {
  return (
    <>
      {loading ? (
        <FullPageLoader height={50} width={50} />
      ) : error ? (
        <div className="error-container">
          <Message type="error" message={error} />
        </div>
      ) : data.length === 0 ? (
        <EmptyContainer message="Order List is Empty" />
      ) : (
        data.map((item) => {
          return (
            <OrderCard
              key={item._id}
              order={item}
              showActions={showActions}
              url={url ? url : ""}
            />
          );
        })
      )}
    </>
  );
}

OrderList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      isDelivered: PropTypes.bool.isRequired,
      isPaid: PropTypes.bool.isRequired,
      paymentMethod: PropTypes.string.isRequired,
      total_price: PropTypes.number.isRequired,
    })
  ),
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  showActions: PropTypes.bool.isRequired,
  url: PropTypes.string,
};
