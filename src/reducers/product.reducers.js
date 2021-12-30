import { productContants } from "../actions/constants";

const initState = {
  propducts: [],
};
export default (state = initState, action) => {
  switch (action.type) {
    case productContants.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
      };
    default:
      return state;
  }
};
