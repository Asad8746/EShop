import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { ProductForm, CustomLoader } from "../../Components";
import { getEditProduct, updateProduct } from "../../actions";
import { FullPageError } from "../../Components/FullPageError";
export const EditProductPage = () => {
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id || "";
  const { data, loading } = useSelector((store) => store.editProduct);
  useEffect(() => {
    dispatch(
      getEditProduct(id, (errorMessage) => {
        if (errorMessage && errorMessage !== error) {
          setError(errorMessage);
        }
      })
    );
  }, [id]);
  const onSubmit = (data) => {
    dispatch(
      updateProduct(id, data, () => {
        history.goBack();
      })
    );
  };
  if (loading)
    return (
      <div className="error-container">
        <CustomLoader height={50} width={50} />
      </div>
    );
  return error ? (
    <FullPageError error={error} />
  ) : (
    <ProductForm
      title="Edit Product"
      initialValues={data}
      onSubmit={onSubmit}
    />
  );
};
