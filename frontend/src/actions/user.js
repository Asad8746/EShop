import Api from "../Api";
import domains from "../domains";
import history from "../history";
import {
  setUserAndAuth,
  resetUser,
  setLoginLoading,
  setLoginError,
  setUserLoading,
  setSignupError,
  setSignupLoading,
  resetCart,
  resetLogin,
  resetSignup,
  resetOrder,
  resetOrders,
} from "../reducers/constants";

import returnError from "../utils/error";
export const loginUserAction = (email, password, cb = () => {}) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: setLoginLoading, payload: true });
      const response = await Api.post("/user/login", { email, password });
      const token = `Bearer ${response.headers["authorization"]}`;
      localStorage.setItem("authorization", token);
      dispatch({ type: setUserAndAuth, payload: response.data });
      if (getState().login.error.length > 0) {
        dispatch({ type: setLoginError, payload: "" });
      }
      cb();
    } catch (err) {
      console.log(err.message);
      dispatch({ type: setLoginError, payload: returnError(err) });
    } finally {
      dispatch({ type: setLoginLoading, payload: false });
    }
  };
};

export const checkToken = () => {
  return async (dispatch) => {
    try {
      const response = await Api.get("/user/me");
      dispatch({ type: setUserAndAuth, payload: response.data });
    } catch (err) {
      localStorage.removeItem("authorization");
      console.log(returnError(err));
    } finally {
      dispatch({ type: setUserLoading, payload: false });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch({ type: resetUser });
    dispatch({ type: resetCart });
    dispatch({ type: resetLogin });
    dispatch({ type: resetOrder });
    dispatch({ type: resetOrders });
    dispatch({ type: resetSignup });
    history.push(domains.home);
  };
};

export const registerUser = (data, cb = () => {}) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: setSignupLoading, payload: true });
      const response = await Api.post("/user/register", data);
      dispatch({ type: setUserAndAuth, payload: response.data });
      if (getState().signup.error.length > 0) {
        dispatch({ type: setSignupError, payload: "" });
      }
      cb();
    } catch (err) {
      dispatch({ type: setSignupError, payload: returnError(err) });
    } finally {
      dispatch({ type: setSignupLoading, payload: false });
    }
  };
};
