import {
  setEditProduct,
  resetEditPRODUCT,
  setEditProductError,
  setEditProductSuccess,
  setEditProductLoading,
} from "./constants";
import { INIT_STATE } from "./initState";
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setEditProduct:
      return { ...state, data: action.payload };
    case setEditProductSuccess:
      return { ...state, success: action.payload, error: "" };
    case setEditProductLoading:
      return { ...state, loading: action.payload };
    case resetEditPRODUCT:
      return { ...INIT_STATE };
    case setEditProductError:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
