import { INIT_STATE } from "./initState";
import { setProducts, setProductsLoading, setProductsError } from "./constants";
const productReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setProducts:
      return { ...state, data: action.payload };
    case setProductsLoading:
      return { ...state, loading: action.payload };
    case setProductsError:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default productReducer;
