import {
  setCartItems,
  setCartLoading,
  setCartError,
  removeCartItem,
  saveAddress,
  savePaymentMethod,
} from "../reducers/constants";
import Api from "../Api";
export const addItem = (id, qty) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: setCartLoading, payload: true });
      const response = await Api.get(`/products/${id}`);
      const payload = {
        id: response.data._id,
        name: response.data.name,
        image: response.data.image,
        price: response.data.price,
        stockCount: response.data.stockCount,
        qty,
      };

      dispatch({ type: setCartItems, payload });
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.items));
      dispatch({ type: setCartLoading, payload: false });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const removeItem = (id) => {
  return (dispatch, getState) => {
    try {
      dispatch({ type: removeCartItem, payload: { id } });
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.items));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const saveAddressAction = (data) => {
  localStorage.setItem("address", JSON.stringify(data));
  return { type: saveAddress, payload: data };
};

export const savePaymentMethodAction = (data) => {
  localStorage.setItem("paymentMethod", data);
  return { type: savePaymentMethod, payload: data };
};
