import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { DeleteConfirmationModal } from "../../Components";
import { deleteUser } from "../../actions";
export const UserDeleteConfirmation = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const id = params?.id;
  const onSuccessClick = () => {
    if (id) {
      dispatch(
        deleteUser(id, () => {
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
      title="Delete User"
      message="Would you like to delete this user?"
      onSuccessClick={onSuccessClick}
      onCancelClick={onCancelClick}
    />
  );
};
