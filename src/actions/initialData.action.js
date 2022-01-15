import axiosInstance from "../helpers/axios";
import {
  categoryConstants,
  orderConstants,
  productContants,
} from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    //dispatch({type:initialDataConstants.GET_ALL_INITIAL_DATA_REQUEST});
    try {
      const res = await axiosInstance.post("/initialData");
      if (res.status === 200) {
        const { categories, products, orders } = res.data;
        dispatch({
          type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
          payload: {
            categories: categories,
          },
        });
        dispatch({
          type: productContants.GET_ALL_PRODUCTS_SUCCESS,
          payload: {
            products: products,
          },
        });
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: {
            orders: orders,
          },
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
};
