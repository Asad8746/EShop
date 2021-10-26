import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  getAdminProducts,
  setProductDeleteSuccessAction,
  resetCreateProductAction,
  resetEditProductAction,
} from "../../actions";
import domains from "../../domains";
import { Table } from "../Table";
import { ProductTableItem } from "../ProductTableItem";
import "./index.style.scss";

const headers = [
  "Image",
  "Name",
  "Brand",
  "Category",
  "Created On",
  "Created By",
  "Price",
  "Stock Count",
  "Actions",
];
export const ProductsTable = () => {
  const { data, error, loading, deleteSuccess } = useSelector(
    (store) => store.adminProducts
  );
  const createProduct = useSelector((store) => store.createProduct);
  const editProductSuccess = useSelector((store) => store.editProduct.success);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (deleteSuccess || createProduct.success || editProductSuccess) {
      dispatch(getAdminProducts());
      if (deleteSuccess) {
        dispatch(setProductDeleteSuccessAction(false));
      } else if (createProduct.success) {
        dispatch(resetCreateProductAction());
      } else if (editProductSuccess) {
        dispatch(resetEditProductAction());
      }
    }
  }, [deleteSuccess, createProduct.success, editProductSuccess]);
  const renderItem = (product) => {
    return <ProductTableItem product={product} key={product._id} />;
  };
  const onAddClick = () => {
    history.push(domains.createProduct);
  };
  return (
    <div className="product-table">
      <div className="product-table__header">
        <h1>Products</h1>
        <button onClick={onAddClick}>
          <i className="fas fa-plus"></i>
          New Product
        </button>
      </div>
      <Table
        onInitialRender={getAdminProducts}
        error={error}
        loading={loading}
        data={data}
        headers={headers}
        renderItem={renderItem}
      />
    </div>
  );
};
