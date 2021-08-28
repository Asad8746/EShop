import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import { Container, FullPageLoader, OrderCard } from "../../Components";
import "./index.style.scss";

const labels = [
  "Order id",
  "Created on",
  "Paid Status",
  "Delivered Status",
  "Total",
];
export const OrdersPage = (props) => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((store) => store.orders);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  if (loading) return <FullPageLoader height={50} width={50} />;
  return (
    <Container>
      <div className="orders">
        <div style={{ width: "100%", textAlign: "center" }}>
          <h2 className="heading__main">Your Orders</h2>
        </div>
        {data.map((item) => {
          return <OrderCard key={item._id} order={item} />;
        })}
      </div>
    </Container>
  );
};

OrdersPage.propTypes = {};
