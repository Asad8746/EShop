import {
  setAdminProductsList,
  setAdminProductsError,
  resetAdminProductsList,
  setAdminProductsLoading,
  setProductDeleteSuccess,
} from "./constants";
import { INIT_STATE } from "./initState";
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setAdminProductsList:
      return { ...state, data: action.payload, error: "" };
    case resetAdminProductsList:
      return { ...INIT_STATE, loading: false };
    case setAdminProductsLoading:
      return { ...state, loading: action.payload };
    case setAdminProductsError:
      return { ...state, error: action.payload };
    case setProductDeleteSuccess:
      return { ...state, deleteSuccess: action.payload };
    default:
      return state;
  }
};

export default reducer;
