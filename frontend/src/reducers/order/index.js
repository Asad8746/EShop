import {
  setOrder,
  setOrderError,
  setOrderLoading,
  resetOrder,
} from "./constants";
import { INIT_STATE } from "./initState";

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setOrderLoading:
      return { ...state, loading: action.payload };
    case setOrderError:
      return { ...state, error: action.payload };
    case setOrder:
      return { ...state, data: action.payload };
    case resetOrder:
      return { ...INIT_STATE };
    default:
      return state;
  }
};

export default reducer;
