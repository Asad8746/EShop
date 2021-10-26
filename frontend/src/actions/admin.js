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
  setEditProductError,
  setEditProductSuccess,
  setEditProductLoading,
  resetEditPRODUCT,
  setAdminOrdersList,
  setAdminOrdersLoading,
  setAdminOrdersError,
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

export const getAdminProducts = () => {
  return async (dispatch, getState) => {
    try {
      if (!getState().adminProducts.loading) {
        dispatch({ type: setAdminProductsLoading, payload: true });
      }
      const response = await Api.get("/admin/products");
      dispatch({ type: setAdminProductsList, payload: response.data });
      dispatch({ type: setAdminProductsLoading, payload: false });
    } catch (err) {
      console.log(err.message);
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

export const getEditProduct = (id) => {
  return async (dispatch) => {
    try {
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
      dispatch({ type: setEditProductError, payload: returnError(err) });
    } finally {
      dispatch({ type: setEditProductLoading, payload: false });
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

export const getAdminOrders = () => {
  return async (dispatch, getState) => {
    try {
      if (!getState().adminOrders.loading) {
        dispatch({ type: setAdminOrdersLoading, payload: true });
      }
      const response = await Api.get("/admin/orders");
      dispatch({ type: setAdminOrdersList, payload: response.data });
    } catch (err) {
      dispatch({ type: setAdminOrdersError, payload: returnError(err) });
    } finally {
      dispatch({ type: setAdminOrdersLoading, payload: false });
    }
  };
};
export const markOrder = async (id, data, cb) => {
  const response = await Api.patch(`/admin/orders/${id}`, data);
  cb(response.data);
};
