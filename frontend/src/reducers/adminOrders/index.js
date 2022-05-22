import {
  setAdminOrdersList,
  setAdminOrdersError,
  resetAdminOrdersList,
  setAdminOrdersLoading,
  setOrderDeleteSuccess,
} from "./constants";
import { INIT_STATE } from "./initState";
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setAdminOrdersList:
      return { ...state, data: action.payload, error: "" };
    case resetAdminOrdersList:
      return { ...INIT_STATE, loading: false };
    case setAdminOrdersLoading:
      return { ...state, loading: action.payload };
    case setAdminOrdersError:
      return { ...state, error: action.payload };
    case setOrderDeleteSuccess:
      return { ...state, deleteSuccess: action.payload };
    default:
      return state;
  }
};

export default reducer;
