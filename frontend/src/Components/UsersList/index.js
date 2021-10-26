import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../Table";
import { UserItem } from "../UserItem";
import { getUsers, setUserDeleteSuccessAction } from "../../actions";

import "./index.style.scss";
const headers = ["Name", "Date Joined", "E-mail", "Admin", ""];
export const UsersList = () => {
  const { error, loading, data, deleteSuccess } = useSelector(
    (store) => store.users
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (deleteSuccess) {
      dispatch(getUsers());
      dispatch(setUserDeleteSuccessAction(false));
    }
  }, [deleteSuccess]);
  const renderItem = (user) => {
    return <UserItem user={user} key={user._id} />;
  };

  return (
    <Table
      onInitialRender={getUsers}
      error={error}
      loading={loading}
      data={data}
      headers={headers}
      renderItem={renderItem}
    />
  );
};
