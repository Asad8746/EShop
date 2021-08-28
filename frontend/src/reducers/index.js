import { combineReducers } from "redux";
import products from "./products";
import product from "./product";
import cart from "./cart";
import user from "./user";
import login from "./loginForm";
import signup from "./signUpForm";
import order from "./order";
import orders from "./orders";
export default combineReducers({
  products,
  product,
  cart,
  user,
  login,
  signup,
  order,
  orders,
});
