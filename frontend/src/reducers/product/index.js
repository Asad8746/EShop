import {
  setProduct,
  setProductLoading,
  setProductError,
  resetProduct,
} from "./constants";
import { INIT_STATE } from "./initState";
const productReducer = (state = INIT_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case setProduct:
      return { ...state, data: payload };
    case setProductLoading:
      return { ...state, loading: payload };
    case setProductError:
      return { ...state, error: payload };
    case resetProduct:
      return { ...INIT_STATE };
    default:
      return state;
  }
};

export default productReducer;
