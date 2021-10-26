import {
  setProduct,
  setProductLoading,
  setProductError,
  resetProduct,
} from "./constants";
import { INIT_STATE } from "./initState";
const productReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setProduct:
      return { ...state, data: action.payload };
    case setProductLoading:
      return { ...state, loading: action.payload };
    case setProductError:
      return { ...state, error: action.payload };
    case resetProduct:
      return { ...INIT_STATE };
    default:
      return state;
  }
};

export default productReducer;
