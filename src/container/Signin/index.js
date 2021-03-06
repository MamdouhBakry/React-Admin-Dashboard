import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Home from "../Home";
import Layout from "../../components/Layout/index,";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let auth = useSelector((state) => state.auth);
  let authen = auth.authenticate;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
    setTimeout(() => {
      navigate("/");
    }, 400);
  };
  return (
    <>
      {authen ? (
        <Home />
      ) : (
        <Layout>
          <Container style={{ marginTop: "6rem" }}>
            <Row className="mt-5">
              <Col md={{ span: 6, offset: 3 }}>
                <Form onSubmit={userLogin}>
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Layout>
      )}
    </>
  );
}
