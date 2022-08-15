import Api from "../Api";
import {
  setReviewsList,
  setReviewsError,
  setReviewsLoading,
  resetReviews,
  setReviewSaveSuccess,
} from "../reducers/constants";
import returnError from "../utils/error";
export const getReviews = (id) => {
  return async (dispatch, getState) => {
    try {
      if (!getState().reviews.loading) {
        dispatch({ type: setReviewsLoading, payload: true });
      }
      const response = await Api.get(`/products/${id}/reviews`);
      dispatch({ type: setReviewsList, payload: response.data?.reviews });
    } catch (err) {
      dispatch({ type: setReviewsError, payload: returnError(err) });
    } finally {
      dispatch({ type: setReviewsLoading, payload: false });
    }
  };
};

export const resetReviewsAction = () => {
  return { type: resetReviews };
};

export const saveReview = (id, body = {}, cb) => {
  return async (dispatch) => {
    try {
      await Api.post(`/products/${id}/rate`, body);
      dispatch({ type: setReviewSaveSuccess, payload: true });
    } catch (err) {
      cb(returnError(err));
    }
  };
};
export const setSaveReview = (value) => {
  return { type: setReviewSaveSuccess, payload: value };
};
