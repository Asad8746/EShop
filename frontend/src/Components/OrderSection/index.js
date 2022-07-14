import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders } from "../../actions";
import domains from "../../domains";
import { OrderList } from "../OrderList";
import { Pagination } from "../Pagination";

import "./index.style.scss";
export const OrderSection = () => {
  const { data, loading, error } = useSelector((store) => store.adminOrders);
  const { currentPage } = useSelector((store) => store.pagination);
  const dispatch = useDispatch();

  const url = domains.adminOrder.split("/").slice(0, 3).join("/");
  useEffect(() => {
    dispatch(getAdminOrders(currentPage));
  }, [currentPage]);
  return (
    <>
      <div className="admin-order">
        <OrderList
          data={data}
          loading={loading}
          error={error}
          showActions
          url={url}
        />
      </div>
      <Pagination />
    </>
  );
};
