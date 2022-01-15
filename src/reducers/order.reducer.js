import { orderConstants } from "../actions/constants";
const initState = {
  orders: [],
};
export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
      };
    default:
      return state;
  }
};
