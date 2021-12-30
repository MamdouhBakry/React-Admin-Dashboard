import React, { useEffect, Suspense } from "react";
import "./App.css";
import Layout from "./components/Layout/index,";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, isUserLoggedIn } from "./actions";
import { LinearProgress } from "@material-ui/core";
import { getInitialData } from "./actions/initialData.action";

export const Home = React.lazy(() => import("./container/Home"));
//import Home from "./container/Home";
export const Signin = React.lazy(() => import("./container/Signin"));
//import Signin from "./container/Signin";
export const Signup = React.lazy(() => import("./container/Signup"));
//import Signup from "./container/Signup";
export const PrivateRoute = React.lazy(() =>
  import("./components/HOC/PrivateRoute")
);
//import PrivateRoute from "./components/HOC/PrivateRoute";
export const Products = React.lazy(() => import("./container/Products"));
//import Products from "./container/Products";
export const Orders = React.lazy(() => import("./container/Orders"));
//import Orders from "./container/Orders";
export const Category = React.lazy(() => import("./container/Category"));
//import Category from "./container/Category";
//import Dashboard from "./container/Dashboard/dashboard";
function App() {
  let auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<LinearProgress />}>
        <Routes>
          {/* Nested Routes and layout */}
          {/* <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="/home" exact element={<Home />} />
              <Route path="products" exact element={<Products />} />
              <Route path="orders" exact element={<Orders />} />
              <Route path="categories" exact element={<Category />} />
            </Route>
          </Route> */}
          <Route exact element={<PrivateRoute />}>
            <Route path="/" exact element={<Home />} />
          </Route>
          <Route exact element={<PrivateRoute />}>
            <Route path="/products" exact element={<Products />} />
          </Route>
          <Route exact element={<PrivateRoute />}>
            <Route path="/orders" exact element={<Orders />} />
          </Route>
          <Route exact element={<PrivateRoute />}>
            <Route path="/categories" exact element={<Category />} />
          </Route>
          <Route path="/signin" exact element={<Signin />} />
          <Route path="/signup" exact element={<Signup />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
