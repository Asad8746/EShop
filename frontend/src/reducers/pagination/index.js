import {
  resetPagination,
  setPaginationPage,
  setPaginationSize,
  setPaginationTotal,
} from "./constants";
import { INIT_STATE } from "./initState";

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setPaginationPage:
      return { ...state, currentPage: action.payload };
    case setPaginationSize:
      return { ...state, pageSize: action.payload };
    case setPaginationTotal:
      return { ...state, totalPages: action.payload };
    case resetPagination:
      return { ...INIT_STATE };
    default:
      return state;
  }
};

export default reducer;
