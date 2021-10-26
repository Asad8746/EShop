import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { saveReview } from "../../actions";
import { Input } from "../Input";
import { Message } from "../Message";
import { useFormValidation } from "../../hooks/useFormValidation";
import { emptyValidator } from "../../validation";
import "./index.style.scss";
export const ReviewForm = () => {
  const params = useParams();
  const id = params?.id || "";
  const comment = useFormValidation("", emptyValidator, "comment is required");
  const [rate, setRate] = useState(1);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const onBlur = (value) => {
    comment.setBlur(value);
  };
  const onChange = (value) => {
    comment.setValue(value);
  };
  const onIconClick = (value) => {
    setRate(value);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveReview(
        id,
        {
          rating: rate,
          comment: comment.value,
        },
        (err) => {
          setError(err);
        }
      )
    );
  };
  const btnDisabled = !comment.isValid || comment.error;
  return (
    <div className="review-form">
      <form onSubmit={onFormSubmit}>
        <Input
          required
          value={comment.value}
          fieldName="comment"
          placeholder="Comment"
          blur={comment.blur}
          error={comment.error}
          label="Comment"
          onBlur={onBlur}
          onChange={onChange}
        />
        <div className="review-form__stars">
          {[1, 2, 3, 4, 5].map((i) => {
            if (i <= rate) {
              return (
                <i
                  className={`fas fa-star review-form__star`}
                  key={`${rate}#${i}`}
                  onClick={() => onIconClick(i)}
                ></i>
              );
            } else {
              return (
                <i
                  className="far fa-star review-form__star"
                  key={`${rate}#${i}`}
                  onClick={() => onIconClick(i)}
                ></i>
              );
            }
          })}
        </div>
        {error && (
          <div className="error-container">
            <Message message={error} variant="error" />
          </div>
        )}

        <div className="review-form__btn-container">
          <button className="btn btn--primary" disabled={btnDisabled}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
