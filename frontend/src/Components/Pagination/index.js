import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPaginationCurrenPage, resetPaginationReducer } from "../../actions";
import "./index.style.scss";
export const Pagination = () => {
  const pagination = useSelector((store) => store.pagination);
  const dispatch = useDispatch();
  const onBoxClicked = (value) => {
    if (pagination.currentPage !== value) {
      dispatch(setPaginationCurrenPage(value));
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetPaginationReducer());
    };
  }, []);
  return (
    pagination.totalPages > 0 && (
      <>
        <div className="pagination__container" />
        <footer className="pagination">
          <div className="pagination__box-container">
            {Array.from(Array(pagination.totalPages).keys()).map(
              (item, idx) => (
                <div
                  key={`${item}${idx}`}
                  className={`pagination__box ${
                    pagination.currentPage === item + 1
                      ? "pagination__box--active"
                      : ""
                  }`}
                  onClick={() => onBoxClicked(item + 1)}
                >
                  {item + 1}
                </div>
              )
            )}
          </div>
        </footer>
      </>
    )
  );
};
