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
    <>
      <Header />
      <Col md={2} className="sidebar vh-100">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/page">Page</NavLink>
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
