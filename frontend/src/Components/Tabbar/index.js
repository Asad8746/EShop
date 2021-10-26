import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdminActiveItem } from "../../actions";
import "./index.style.scss";
const items = [
  { label: "users", icon: "users" },
  { label: "products", icon: "store-alt" },
  { label: "orders", icon: "shopping-cart" },
];
export const Tabbar = () => {
  const dispatch = useDispatch();
  const adminState = useSelector((store) => store.admin);
  const onItemClick = (value) => {
    dispatch(setAdminActiveItem(value));
  };
  return (
    <div className="admin__tabbar">
      {items.map((item, idx) => {
        const isActive =
          adminState.activeItem.toLowerCase() === item.label.toLowerCase();
        return (
          <div
            className={`admin__tabbar-item ${
              isActive ? "admin__tabbar-item--active" : ""
            }`}
            key={`${item.label}${idx}`}
            onClick={() => {
              if (!isActive) {
                onItemClick(item.label);
              }
            }}
          >
            <div
              className={`tab-item__content ${
                isActive ? "tab-item__content--active" : ""
              } `}
            >
              <i className={`fas fa-${item.icon}`}></i>
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
