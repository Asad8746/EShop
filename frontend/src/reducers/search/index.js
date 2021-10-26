import { INIT_STATE } from "./initState";
import {
  setSearchProducts,
  setSearchProductsLoading,
  setSearchProductsError,
} from "./constants";
const productReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setSearchProducts:
      return { ...state, data: action.payload };
    case setSearchProductsLoading:
      return { ...state, loading: action.payload };
    case setSearchProductsError:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default productReducer;
