import { combineReducers } from "redux";
import products from "./products";
import product from "./product";
import cart from "./cart";
import user from "./user";
import login from "./loginForm";
import signup from "./signUpForm";
import order from "./order";
import orders from "./orders";
import admin from "./admin";
import users from "./users";
import adminProducts from "./adminProducts";
import createProduct from "./createProduct";
import editProduct from "./editProduct";
import adminOrders from "./adminOrders";
import reviews from "./reviews";
import search from "./search";
import pagination from "./pagination";
import editProfile from "./editProfile";
export default combineReducers({
  products,
  product,
  cart,
  user,
  login,
  signup,
  order,
  orders,
  admin,
  users,
  adminProducts,
  createProduct,
  editProduct,
  adminOrders,
  reviews,
  search,
  pagination,
  editProfile,
});
