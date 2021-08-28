import Api from "../Api";
import {
  setOrders,
  setOrdersError,
  setOrdersLoading,
} from "../reducers/constants";
import returnError from "../utils/error";
export const getOrders = () => {
  return async (dispatch) => {
    try {
      const response = await Api.get("/orders");
      dispatch({ type: setOrders, payload: response.data });
      dispatch({ type: setOrdersLoading, payload: false });
    } catch (err) {
      dispatch({ type: setOrdersError, payload: returnError(err) });
    }
  };
};
