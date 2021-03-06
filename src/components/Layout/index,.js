import Header from "../Header";
import "./layoutStyle.css";
/////////////////////////////////////////////////////////////
import React from "react";
import { NavLink } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

export default function Layout(props) {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink activeClassName="active" to="/">
                    Home
                  </NavLink>
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
            <Col md={10} sm={12} className="content">
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
