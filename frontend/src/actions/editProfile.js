import Api from "../Api";
import {
  setEditProfileLoading,
  setEditProfileError,
  setUser,
} from "../reducers/constants";
import returnError from "../utils/error";
export const editProfile = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: setEditProfileLoading, payload: true });

      const response = await Api.patch("/user/me", data);
      dispatch({ type: setUser, payload: response.data });
    } catch (err) {
      dispatch({ type: setEditProfileError, payload: returnError(err) });
    } finally {
      dispatch({ type: setEditProfileLoading, payload: false });
    }
  };
};
