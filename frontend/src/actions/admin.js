import Api from "../Api";
import {
  setAdminActive,
  setUserDeleteSuccess,
  setAdminProductsList,
  setAdminProductsLoading,
  setAdminProductsError,
  setProductDeleteSuccess,
  setCreateProductError,
  setCreateProductSuccess,
  resetCREATEPRODUCT,
  setEditProduct,
  setEditProductSuccess,
  setEditProductLoading,
  resetEditPRODUCT,
  setAdminOrdersList,
  setAdminOrdersLoading,
  setAdminOrdersError,
  setAdminOrder,
  setAdminOrderLoading,
  setAdminOrderError,
  setPaginationTotal,
} from "../reducers/constants";
import returnError from "../utils/error";
export const setAdminActiveItem = (value) => {
  return { type: setAdminActive, payload: value };
};
export const setWebAdmin = async (id, isAdmin = false, cb = () => {}) => {
  try {
    const response = await Api.patch(`/admin/users/${id}`, {
      isAdmin,
    });
    cb(response.data?.isAdmin);
  } catch (err) {
    console.log(err.response);
  }
};
export const deleteUser = (id, cb = () => {}) => {
  return async (dispatch) => {
    try {
      await Api.delete(`/admin/users/${id}`);
      dispatch({ type: setUserDeleteSuccess, payload: true });
      cb();
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const getAdminProducts = (pageNumber = 1, pageSize = 2) => {
  return async (dispatch, getState) => {
    try {
      if (!getState().adminProducts.loading) {
        dispatch({ type: setAdminProductsLoading, payload: true });
      }
      const response = await Api.get(
        `/admin/products?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      const { products, totalPages } = response.data;
      dispatch({ type: setAdminProductsList, payload: products });
      dispatch({
        type: setPaginationTotal,
        payload: totalPages,
      });
    } catch (err) {
      dispatch({ type: setAdminProductsError, payload: returnError(err) });
    } finally {
      dispatch({ type: setAdminProductsLoading, payload: false });
    }
  };
};

export const deleteProduct = (id, cb) => {
  return async (dispatch) => {
    try {
      await Api.delete(`/admin/products/${id}`);
      dispatch({ type: setProductDeleteSuccess, payload: true });
      cb();
    } catch (err) {
      console.log(err);
    }
  };
};

export const setProductDeleteSuccessAction = (value) => {
  return { type: setProductDeleteSuccess, payload: value };
};
export const resetCreateProductAction = () => {
  return { type: resetCREATEPRODUCT };
};

export const createProduct = (data, cb = () => {}) => {
  return async (dispatch) => {
    try {
      const {
        productName,
        image,
        description,
        brand,
        category,
        price,
        stockCount,
      } = data;
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("image", image);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("stockCount", stockCount);
      await Api.post("/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({ type: setCreateProductSuccess, payload: true });
      cb();
    } catch (err) {
      dispatch({ type: setCreateProductError, payload: returnError(err) });
      console.log(err.message);
    }
  };
};

export const getEditProduct = (id, cb = () => {}) => {
  return async (dispatch, getState) => {
    try {
      const loading = getState()?.editProduct?.loading;
      if (!loading) {
        dispatch({ type: setEditProductLoading, payload: true });
      }
      const response = await Api.get(`/products/${id}`);
      const data = response.data;
      dispatch({
        type: setEditProduct,
        payload: {
          productName: data.name,
          brand: data.brand,
          category: data.category,
          description: data.description,
          price: data.price,
          stockCount: data.stockCount,
        },
      });
    } catch (err) {
      cb(returnError(err));
    } finally {
      dispatch({ type: setEditProductLoading, payload: false });
    }
  };
};
export const getAdminOrderDetail = (id) => {
  // setAdminOrder,
  // resetAdminOrderList,
  // setAdminOrderLoading,
  // setAdminOrderError,
  return async (dispatch, getState) => {
    try {
      const loading = getState()?.adminOrder?.loading;
      if (!loading) {
        dispatch({ type: setAdminOrderLoading, payload: true });
      }
      const response = await Api.get(`/admin/orders/${id}`);
      const order = response.data;
      dispatch({
        type: setAdminOrder,
        payload: order,
      });
    } catch (err) {
      dispatch({ type: setAdminOrderError, payload: returnError(err) });
    } finally {
      dispatch({ type: setAdminOrderLoading, payload: false });
    }
  };
};
export const resetEditProductAction = () => {
  return { type: resetEditPRODUCT };
};

export const updateProduct = (id, data, cb = () => {}) => {
  return async (dispatch, getState) => {
    try {
      const prevData = getState().editProduct.data;
      const formData = new FormData();
      Object.keys(prevData).forEach((item) => {
        if (prevData[item] !== data[item]) {
          formData.append(item, data[item]);
        }
      });
      if (data.image) {
        formData.append("image", data.image);
      }

      await Api.patch(`/admin/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({ type: setEditProductSuccess, payload: true });
      cb();
    } catch (err) {
      console.log(returnError(err));
    }
  };
};

export const getAdminOrders = (pageNumber = 1, pageSize = 10) => {
  return async (dispatch, getState) => {
    try {
      let url = "/admin/orders";
      if (!getState().adminOrders.loading) {
        dispatch({ type: setAdminOrdersLoading, payload: true });
      }
      if (pageNumber || pageSize) {
        url += `?page=${pageNumber}&pageSize=${pageSize}`;
      }
      const response = await Api.get(url);
      dispatch({ type: setAdminOrdersList, payload: response.data.orders });
      dispatch({ type: setPaginationTotal, payload: response.data.totalPages });
    } catch (err) {
      dispatch({ type: setAdminOrdersError, payload: returnError(err) });
    } finally {
      dispatch({ type: setAdminOrdersLoading, payload: false });
    }
  };
};
export const markOrder = async (id, data, cb) => {
  try {
    const response = await Api.patch(`/admin/orders/${id}`, data);
    cb(response.data);
  } catch (err) {
    cb(null, returnError(err));
  }
};
