import {
  setProduct,
  setProductError,
  setProductLoading,
} from "../reducers/constants";
import Api from "../Api";

export const getProduct = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: setProductLoading, payload: true });
      const response = await Api.get(`/products/${id}`);
      console.log(response.data);
      dispatch({ type: setProduct, payload: response.data });
    } catch (err) {
      console.log(err.message);
    } finally {
      dispatch({ type: setProductLoading, payload: false });
    }
  };
};
