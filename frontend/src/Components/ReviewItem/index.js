import React from "react";
import { Rating } from "../Rating";
import PropTypes from "prop-types";
import "./index.style.scss";
export const ReviewItem = ({ review }) => {
  return (
    <div className="review-item">
      <div className="review-item__top-container">
        <h3 className="review-item__heading">{review.user.name}</h3>
        <Rating
          rating={review.rating}
          customClass="review-item__rating"
          hideLine
        />
      </div>
      <p className="review-item__content">{review.comment}</p>
    </div>
  );
};
ReviewItem.propTypes = {
  review: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
  }),
};
