import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import {
  Container,
  FullPageLoader,
  OrderCard,
  Message,
} from "../../Components";
import "./index.style.scss";

// const labels = [
//   "Order id",
//   "Created on",
//   "Paid Status",
//   "Delivered Status",
//   "Total",
// ];
export const OrdersPage = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((store) => store.orders);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  if (loading) return <FullPageLoader height={50} width={50} />;
  return (
    <Container>
      <div className="orders">
        <div className="orders__title-container">
          <h2 className="heading__main">Your Orders</h2>
        </div>
        {error ? (
          <div className="error-container">
            <Message type="error" message={error} />
          </div>
        ) : data.length === 0 ? (
          <div className="orders__empty">No Orders Found</div>
        ) : (
          data.map((item) => {
            return <OrderCard key={item._id} order={item} />;
          })
        )}
      </div>
    </Container>
  );
};
