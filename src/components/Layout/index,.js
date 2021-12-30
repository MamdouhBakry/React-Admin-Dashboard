// import React from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import Header from "../Header";
import "./layoutStyle.css";
/////////////////////////////////////////////////////////////
import React, { Suspense } from "react";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

export default function Layout(props) {
  return (
    // <>
    //   <Header />
    //   <div className="col-">
    //     <div className="container-fluid">
    //       <div className="row flex-nowrap">
    //         <div
    //           style={{
    //             backgroundColor: "#eee ",
    //             boxShadow: "inset 0 0 2px gray",
    //           }}
    //           className="col-auto col-md-3 col-xl-2 px-sm-2 px-0"
    //         >
    //           <div className="sidebar min-vh-100">
    //             <ul
    //               className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
    //               id="menu"
    //             >
    //               <li className="w-100">
    //                 <NavLink
    //                   to="/home"
    //                   className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-warning text-decoration-none"
    //                 >
    //                   <span className="d-none d-sm-inline">Home</span>
    //                 </NavLink>
    //               </li>
    //               <li className="w-100">
    //                 <NavLink to="products" className="">
    //                   <span className="d-none d-sm-inline">Products</span>
    //                 </NavLink>
    //               </li>
    //               <li>
    //                 <NavLink to="orders" className="">
    //                   <span className="d-none d-sm-inline">Orders</span>
    //                 </NavLink>
    //               </li>

    //               <li>
    //                 <NavLink to="categories" className=" align-middle">
    //                   <span className="d-none d-sm-inline">Category</span>
    //                 </NavLink>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //         <div className="col py-3">
    //           <Outlet />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <Col md={2} className="sidebar vh-100">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/orders">Orders</NavLink>
          </li>
          <li>
            <NavLink to="/categories">Categories</NavLink>
          </li>
        </ul>
      </Col>
    </>
  );
}
