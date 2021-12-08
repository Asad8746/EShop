import {
  setUserAndAuth,
  resetUser,
  setUserLoading,
  setUser,
} from "./constants";
import { INIT_STATE } from "./initState";
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setUser:
      return { ...state, data: action.payload };
    case setUserAndAuth:
      return { ...state, isAuth: true, data: action.payload };
    case resetUser:
      return { ...INIT_STATE, loading: false };
    case setUserLoading:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default reducer;
