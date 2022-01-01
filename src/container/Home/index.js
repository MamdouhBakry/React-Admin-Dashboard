import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout/index,";
import "./style.css";

export default function Home() {
  return (
    <>
      <Container fluid>
        <Row>
          <Layout />
          <Col md={10} style={{ marginLeft: "auto", marginTop: "4rem" }}>
            <h3>This is Home Page</h3>
          </Col>
        </Row>
      </Container>
    </>
  );
}
