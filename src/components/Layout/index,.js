import Header from "../Header";
import "./layoutStyle.css";
/////////////////////////////////////////////////////////////
import React from "react";
import { NavLink } from "react-router-dom";
import { Col } from "react-bootstrap";

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
