import React from "react";
import PropTypes from "prop-types";
import "./index.style.scss";
export const Rating = ({
  rating,
  totalReviews,
  hideLine,
  showTotalReview,
  customClass,
}) => {
  return (
    <div className={`ratting ${customClass}`}>
      {!hideLine && <div className="ratting__line"></div>}
      <div className="ratting__stars">
        {[1, 2, 3, 4, 5].map((i) => {
          if (i <= rating) {
            let className = rating - i === 0.5 ? "fa-star-half-alt" : "fa-star";
            return (
              <i className={`fas ${className}`} key={`${rating}#${i}`}></i>
            );
          } else {
            return <i className="far fa-star" key={`${rating}#${i}`}></i>;
          }
        })}
        {showTotalReview && (
          <div className="ratting__total-reviews">{totalReviews} reviews</div>
        )}
      </div>
    </div>
  );
};

Rating.defaultProps = {
  rating: 0,
  hideLine: false,
  totalReviews: 0,
  showTotalReview: false,
  customClass: "",
};
Rating.propTypes = {
  rating: PropTypes.number,
  hideLine: PropTypes.bool,
  totalReviews: PropTypes.number,
  showTotalReview: PropTypes.bool,
  customClass: PropTypes.string,
};
