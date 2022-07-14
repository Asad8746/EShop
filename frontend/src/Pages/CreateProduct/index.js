import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ProductForm } from "../../Components";
import { createProduct, setAdminActiveItem } from "../../actions";

export const CreateProductPage = () => {
  const data = useSelector((store) => store.createProduct);
  const history = useHistory();
  const dispatch = useDispatch();
  const onFormSubmit = (data) => {
    dispatch(
      createProduct(data, () => {
        dispatch(setAdminActiveItem("products"));
        history.push("/admin");
      })
    );
  };
  return (
    <ProductForm
      title="Create a New Product"
      onSubmit={onFormSubmit}
      error={data.error}
    />
  );
};
