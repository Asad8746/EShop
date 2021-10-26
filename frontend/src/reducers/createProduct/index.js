import {
  resetCREATEPRODUCT,
  setCreateProductError,
  setCreateProductSuccess,
} from "./constants";
import { INIT_STATE } from "./initState";
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setCreateProductSuccess:
      return { ...state, success: action.payload, error: "" };
    case resetCREATEPRODUCT:
      return { ...INIT_STATE };
    case setCreateProductError:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
