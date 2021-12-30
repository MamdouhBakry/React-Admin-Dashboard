import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header";
import Layout from "../../components/Layout/index,";

export default function Orders() {
  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Layout />
          <Col md={10} style={{ marginLeft: "auto", marginTop: "4rem" }}>
            <h3>This is Order Page</h3>
          </Col>
        </Row>
      </Container>
    </>
  );
}
