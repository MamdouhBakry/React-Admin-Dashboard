import axiosInstance from "../helpers/axios";
import { categoryConstants, productContants } from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    //dispatch({type:initialDataConstants.GET_ALL_INITIAL_DATA_REQUEST});
    const res = await axiosInstance.post("/initialData");
    if (res.status === 200) {
      const { categories, products } = res.data;
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
    }
    console.log(res);
  };
};
