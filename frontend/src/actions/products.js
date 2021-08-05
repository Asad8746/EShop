import Api from "../Api";
import {
  setProducts,
  setProductsError,
  setProductsLoading,
} from "../reducers/constants";

export const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: setProductsLoading, payload: true });
      const response = await Api.get("/products");
      dispatch({ type: setProducts, payload: response.data });
    } catch (err) {
      dispatch({
        type: setProductsError,
        payload:
          err.response && err.response.data
            ? err.response.data.message
            : err.message,
      });
    } finally {
      dispatch({ type: setProductsLoading, payload: false });
    }
  };
};
