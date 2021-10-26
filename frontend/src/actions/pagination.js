import {
  setPaginationPage,
  setPaginationSize,
  setPaginationTotal,
  resetPagination,
} from "../reducers/constants";

export const setPaginationCurrenPage = (value) => {
  return { type: setPaginationPage, payload: value };
};

export const setPaginationSizeAction = (value) => {
  return { type: setPaginationSize, payload: value };
};

export const setPaginationTotalPages = (value) => {
  return { type: setPaginationTotal, payload: value };
};

export const resetPaginationReducer = () => {
  return { type: resetPagination };
};
