import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Tabbar,
  UsersList,
  ProductSection,
  OrderSection,
} from "../../Components";
import "./index.style.scss";
export const AdminPage = () => {
  const { activeItem } = useSelector((store) => store.admin);
  const renderActiveItem = () => {
    if (activeItem === "users") {
      return <UsersList />;
    } else if (activeItem === "products") {
      return <ProductSection />;
    } else if (activeItem === "orders") {
      return <OrderSection />;
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
