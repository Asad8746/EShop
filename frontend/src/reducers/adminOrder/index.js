import {
  setAdminOrderError,
  setAdminOrder,
  resetAdminOrder,
  setAdminOrderLoading,
} from "./constants";
import { INIT_STATE } from "./initState";
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setAdminOrder:
      return { ...state, data: action.payload, error: "" };
    case resetAdminOrder:
      return { ...INIT_STATE, loading: false };
    case setAdminOrderLoading:
      return { ...state, loading: action.payload };
    case setAdminOrderError:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
