import Header from "../Header";
import "./layoutStyle.css";
/////////////////////////////////////////////////////////////
import React from "react";
import { NavLink } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

export default function Layout(props) {
  // return (
  //   <>
  //     <Header />
  //     <Col md={2} className="sidebar vh-100">
  //       <ul>
  //         <li>
  //           <NavLink to="/">Home</NavLink>
  //         </li>
  //         <li>
  //           <NavLink to="/page">Page</NavLink>
  //         </li>
  //         <li>
  //           <NavLink to="/products">Products</NavLink>
  //         </li>
  //         <li>
  //           <NavLink to="/orders">Orders</NavLink>
  //         </li>
  //         <li>
  //           <NavLink to="/categories">Categories</NavLink>
  //         </li>
  //       </ul>
  //     </Col>
  //   </>
  // );
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/page">Page</NavLink>
                </li>
                <li>
                  <NavLink to="/categories">Categories</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/orders">Orders</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto", paddingTop: "60px" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
}
