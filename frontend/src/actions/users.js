import Api from "../Api";
import {
  setUsersError,
  setUsersLoading,
  setUsersList,
  resetUsers,
  setUserDeleteSuccess,
} from "../reducers/constants";
import returnError from "../utils/error";

export const getUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: setUsersLoading, payload: true });
      const response = await Api.get("/admin/users");
      dispatch({ type: setUsersList, payload: response.data });
    } catch (err) {
      dispatch({ type: setUsersError, payload: returnError(err) });
    } finally {
      dispatch({ type: setUsersLoading, payload: false });
    }
  };
};
export const setUserDeleteSuccessAction = (value) => {
  return { type: setUserDeleteSuccess, payload: value };
};

export const restUsersStore = () => {
  return { type: resetUsers };
};
