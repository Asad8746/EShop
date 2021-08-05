import { INIT_STATE } from "./initState";
import {
  removeCartItem,
  setCartError,
  setCartItems,
  setCartLoading,
} from "./constants";
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case setCartItems: {
      const itemExist = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (itemExist) {
        return {
          ...state,
          items: state.items.map((product) =>
            product.id === action.payload.id ? action.payload : product
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    }
    case removeCartItem:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case setCartLoading:
      return {
        ...state,
        loading: action.payload,
      };
    case setCartError:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;