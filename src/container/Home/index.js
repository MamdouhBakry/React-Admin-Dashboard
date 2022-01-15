import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layout/index,";
import "./style.css";

export default function Home() {
  return (
    <>
      <Layout sidebar>
        <h3>This Is Home Page</h3>
      </Layout>
    </>
  );
}
