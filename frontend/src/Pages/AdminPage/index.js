import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Tabbar,
  UsersList,
  ProductsTable,
  OrderTable,
} from "../../Components";
import "./index.style.scss";
export const AdminPage = () => {
  const { activeItem } = useSelector((store) => store.admin);
  const renderActiveItem = () => {
    if (activeItem === "users") {
      return <UsersList />;
    } else if (activeItem === "products") {
      return <ProductsTable />;
    } else if (activeItem === "orders") {
      return <OrderTable />;
    }
  };
  return (
    <Container>
      <div className="admin">
        <Tabbar />
        <div className="admin__content">{renderActiveItem()}</div>
      </div>
    </Container>
  );
};
