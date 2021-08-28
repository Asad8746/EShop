import { getItem } from "../../utils";
const inititalItems = getItem("cartItems", [], true);
const address = getItem("address", {}, true);

const paymentMethod = getItem("paymentMethod", "");
export const INIT_STATE = {
  loading: false,
  error: "",
  items: inititalItems,
  address,
  paymentMethod,
};
