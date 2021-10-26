import {
  setProduct,
  setProductError,
  setProductLoading,
  resetProduct,
} from "../reducers/constants";
import returnError from "../utils/error";
import Api from "../Api";

export const getProduct = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: setProductLoading, payload: true });
      const response = await Api.get(`/products/${id}`);
      dispatch({ type: setProduct, payload: response.data });
    } catch (err) {
      dispatch({ type: setProductError, payload: returnError(err) });
    } finally {
      dispatch({ type: setProductLoading, payload: false });
    }
  };
};
export const resetProductAction = () => {
  return { type: resetProduct };
};
