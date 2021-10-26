import React from "react";
import { DeleteConfirmationModal } from "../../Components";
import { deleteProduct } from "../../actions";
import { useHistory, useParams } from "react-router";
import { useDispatch } from "react-redux";
export const DeleteProductConfirmation = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const id = params?.id;
  const onSuccessClick = () => {
    if (id) {
      dispatch(
        deleteProduct(id, () => {
          history.goBack();
        })
      );
    }
  };
  const onCancelClick = () => {
    history.goBack();
  };
  return (
    <DeleteConfirmationModal
      title="Delete Product"
      message="Would you like to delete this product?"
      onSuccessClick={onSuccessClick}
      onCancelClick={onCancelClick}
    />
  );
};
