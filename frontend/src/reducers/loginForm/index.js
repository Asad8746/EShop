import { setLoginError, setLoginLoading, resetLogin } from "./constants";
const INIT_STATE = {
  loading: false,
  error: "",
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setLoginLoading:
      return { ...state, loading: action.payload };
    case setLoginError:
      return { ...state, error: action.payload };
    case resetLogin:
      return { ...INIT_STATE };
    default:
      return state;
  }
};

export default reducer;
