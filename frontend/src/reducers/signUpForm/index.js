import { setSignupError, setSignupLoading, resetSignup } from "./constants";
const INIT_STATE = {
  loading: false,
  error: "",
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setSignupLoading:
      return { ...state, loading: action.payload };
    case setSignupError:
      return { ...state, error: action.payload };
    case resetSignup:
      return { ...INIT_STATE };
    default:
      return state;
  }
};

export default reducer;
