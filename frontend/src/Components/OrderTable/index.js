import React from "react";
import { useSelector } from "react-redux";
import { getAdminOrders } from "../../actions";
import { Table } from "../Table";
import { OrderTableItem } from "../OrderTableItem";
const headers = [
  "ID",
  "Name",
  "Total",
  "Delivered",
  "Paid",
  "Payment Method",
  "Created On",
];
export const OrderTable = () => {
  const { data, loading, error } = useSelector((store) => store.adminOrders);
  const renderItem = (order) => {
    return <OrderTableItem order={order} key={order._id} />;
  };
  return (
    <Table
      onInitialRender={getAdminOrders}
      error={error}
      loading={loading}
      data={data}
      headers={headers}
      renderItem={renderItem}
    />
  );
};
