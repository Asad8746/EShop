import Api from "../Api";
import {
  setOrder,
  setOrderError,
  resetCart,
  setOrderLoading,
  resetOrder,
} from "../reducers/constants";
import returnError from "../utils/error";

export const createOrder = (data, cb = () => {}) => {
  return async (dispatch) => {
    try {
      const response = await Api.post("/orders/", data);

      localStorage.removeItem("cartItems");
      dispatch({ type: setOrder, payload: response.data });
      dispatch({ type: resetCart });
      cb("", response.data._id);
    } catch (err) {
      cb(returnError(err));
    }
  };
};

export const getOrder = (id) => {
  return async (dispatch) => {
    try {
      const response = await Api.get(`/orders/${id}`);
      console.log(response.data);
      dispatch({ type: setOrder, payload: response.data });
      dispatch({ type: setOrderLoading, payload: false });
    } catch (err) {
      console.log(err.message);
      dispatch({ type: setOrderError, payload: returnError(err) });
    }
  };
};

export const updatePaidStatus = (id, paypalData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: setOrderLoading, payload: true });
      const response = await Api.patch(`/orders/${id}/pay`, {
        ...paypalData,
      });

      dispatch({ type: setOrder, payload: response.data });
    } catch (err) {
      dispatch({ type: setOrderError, payload: returnError(err) });
    } finally {
      dispatch({ type: setOrderLoading, payload: false });
    }
  };
};

export const resetOrderAction = () => {
  return { type: resetOrder };
};
