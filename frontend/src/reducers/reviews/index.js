import {
  setReviewsList,
  setReviewsLoading,
  setReviewsError,
  resetReviews,
  setReviewSaveSuccess,
} from "./constants";
import { INIT_STATE } from "./initState";
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setReviewsList:
      return { ...state, data: action.payload };
    case setReviewsLoading:
      return { ...state, loading: action.payload };
    case setReviewsError:
      return { ...state, error: action.payload };
    case setReviewSaveSuccess:
      return { ...state, reviewSaveSuccess: action.payload };
    case resetReviews:
      return { ...INIT_STATE };
    default:
      return state;
  }
};

export default reducer;
