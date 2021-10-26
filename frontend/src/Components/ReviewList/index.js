import React, { useEffect } from "react";
import { getReviews } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { CustomLoader } from "../Loader";
import { Message } from "../Message";
import { ReviewItem } from "../ReviewItem";
import { ReviewForm } from "../ReviewForm";
import { resetReviewsAction } from "../../actions";
import "./index.style.scss";

export const ReviewList = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.user.isAuth);
  const { data, loading, error, reviewSaveSuccess } = useSelector(
    (store) => store.reviews
  );
  const params = useParams();
  const id = params?.id;
  useEffect(() => {
    return () => {
      dispatch(resetReviewsAction());
    };
  }, []);
  useEffect(() => {
    dispatch(getReviews(id));
  }, [id, reviewSaveSuccess]);

  return (
    <div className="reviews">
      <h2 className="reviews__heading">Reviews</h2>
      {loading ? (
        <div className="reviews__loader-container">
          <CustomLoader height={30} width={30} />
        </div>
      ) : error ? (
        <div className="error-container">
          <Message message={error} variant="error" />
        </div>
      ) : (
        <>
          <div className="reviews__list">
            {data.map((review) => {
              return <ReviewItem key={review._id} review={review} />;
            })}
          </div>
          {isAuth && <ReviewForm />}
        </>
      )}
    </div>
  );
};
