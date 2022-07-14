import {
  setUsersList,
  setUsersError,
  resetUsers,
  setUsersLoading,
  setUserDeleteSuccess,
} from "./constants";
import { INIT_STATE } from "./initState";
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setUsersList:
      return { ...state, isAuth: true, data: action.payload, error: "" };
    case resetUsers:
      return { ...INIT_STATE, loading: false };
    case setUsersLoading:
      return { ...state, loading: action.payload };
    case setUsersError:
      return { ...state, error: action.payload };
    case setUserDeleteSuccess:
      return { ...state, deleteSuccess: action.payload };
    default:
      return state;
  }
};

export default reducer;
