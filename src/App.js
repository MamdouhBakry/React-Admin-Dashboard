import React, { useEffect, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
import { LinearProgress } from "@material-ui/core";
import { getInitialData } from "./actions/initialData.action";
import NewPage from "./container/NewPage/index";

export const Home = React.lazy(() => import("./container/Home"));
export const Signin = React.lazy(() => import("./container/Signin"));
export const Signup = React.lazy(() => import("./container/Signup"));
export const PrivateRoute = React.lazy(() =>
  import("./components/HOC/PrivateRoute")
);
export const Products = React.lazy(() => import("./container/Products"));
export const Orders = React.lazy(() => import("./container/Orders"));
export const Category = React.lazy(() => import("./container/Category"));
function App() {
  let auth = useSelector((state) => state.auth);
  console.log("auth", auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Suspense fallback={<LinearProgress />}>
        <Routes>
          <Route exact element={<PrivateRoute />}>
            <Route path="/" exact element={<Home />} />
          </Route>
          <Route exact element={<PrivateRoute />}>
            <Route path="/page" exact element={<NewPage />} />
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
