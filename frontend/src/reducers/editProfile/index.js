import {
  resetEditProfile,
  setEditProfileError,
  setEditProfileLoading,
} from "./constants";
const INIT_STATE = {
  loading: false,
  error: "",
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setEditProfileLoading:
      return { ...state, loading: action.payload };
    case setEditProfileError:
      return { ...state, error: action.payload };
    case resetEditProfile:
      return { ...INIT_STATE };
    default:
      return state;
  }
};

export default reducer;
