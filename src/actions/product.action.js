import axiosInstance from "../helpers/axios";

export const addProduct = (form) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.post("/product/create", form);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
};
