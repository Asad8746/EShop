import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import { Container, OrderList } from "../../Components";
import "./index.style.scss";

export const OrdersPage = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((store) => store.orders);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <Container>
      <div className="orders">
        <div className="orders__title-container">
          <h2 className="heading__main">Your Orders</h2>
        </div>
        <OrderList
          error={error}
          data={data}
          loading={loading}
          showActions={false}
        />
      </div>
    </Container>
  );
};
