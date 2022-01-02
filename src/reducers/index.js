import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import categoryReducer from "./category.reducers";
import productReducer from "./product.reducers";
import orderReducer from "./order.reducer";
import pageReducer from "./page.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  order: orderReducer,
  page: pageReducer,
});

export default rootReducer;
