import {
  setOrders,
  setOrdersError,
  setOrdersLoading,
  resetOrders,
} from "./constants";
import { INIT_STATE } from "./initState";

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setOrdersLoading:
      return { ...state, loading: action.payload };
    case setOrdersError:
      return { ...state, error: action.payload };
    case setOrders:
      return { ...state, data: action.payload };
    case resetOrders:
      return { ...INIT_STATE };

    default:
      return state;
  }
};

export default reducer;
