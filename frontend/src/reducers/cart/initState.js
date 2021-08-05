const inititalItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
export const INIT_STATE = {
  loading: false,
  error: "",
  items: inititalItems,
};
