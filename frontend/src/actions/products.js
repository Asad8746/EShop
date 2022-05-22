import Api from "../Api";
import {
  setProducts,
  setProductsError,
  setProductsLoading,
  setSearchProducts,
  setSearchProductsError,
  setSearchProductsLoading,
  setPaginationTotal,
} from "../reducers/constants";
import returnError from "../utils/error";
export const getProducts = (pageNumber = 1) => {
  return async (dispatch, getState) => {
    try {
      if (!getState().products.loading) {
        dispatch({ type: setProductsLoading, payload: true });
      }
      let url = "/products";
      if (pageNumber) {
        url += `?page=${pageNumber}&pageSize=10`;
      }
      const response = await Api.get(url);
      dispatch({ type: setProducts, payload: response.data.products || [] });
      dispatch({
        type: setPaginationTotal,
        payload: response.data.totalPages ?? 0,
      });
    } catch (err) {
      dispatch({
        type: setProductsError,
        payload: returnError(err),
      });
    } finally {
      dispatch({ type: setProductsLoading, payload: false });
    }
  };
};
export const getSearchProducts = (query = "", pageNumber = 1) => {
  return async (dispatch, getState) => {
    try {
      if (!getState().products.loading) {
        dispatch({ type: setSearchProductsLoading, payload: true });
      }

      const response = await Api.get(`/products?q=${query}&page=${pageNumber}`);

      dispatch({ type: setSearchProducts, payload: response.data.products });
      dispatch({ type: setPaginationTotal, payload: response.data.totalPages });
    } catch (err) {
      dispatch({
        type: setSearchProductsError,
        payload: returnError(err),
      });
    } finally {
      dispatch({ type: setSearchProductsLoading, payload: false });
    }
  };
};
