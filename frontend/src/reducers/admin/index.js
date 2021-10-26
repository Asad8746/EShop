import { setAdminActive } from "./constants";
import { INIT_STATE } from "./initState";

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setAdminActive: {
      return {
        ...state,
        activeItem: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
