import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ProductList } from "../ProductList";
import { Pagination } from "../Pagination";
import { getAdminProducts } from "../../actions";
import domains from "../../domains";
import "./index.style.scss";

export const ProductSection = () => {
  const { data, error, loading } = useSelector((store) => store.adminProducts);
  const pagination = useSelector((store) => store.pagination);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getAdminProducts(pagination.currentPage, pagination.pageSize));
  }, [pagination.currentPage]);
  const onAddClick = () => {
    history.push(domains.createProduct);
  };
  return (
    <div className="product-section">
      <div className="product-section__header">
        <h1>Products</h1>
        <button onClick={onAddClick}>
          <i className="fas fa-plus"></i>
          New Product
        </button>
      </div>
      <ProductList
        data={data}
        loading={loading}
        error={error}
        showActions
        moveForward={false}
      />
      <Pagination />
    </div>
  );
};
