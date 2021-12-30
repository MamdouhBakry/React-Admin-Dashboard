import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/index,";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Home from "../Home";
import Header from "../../components/Header";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
    }, 500);
  };
  return (
    <>
      {authen ? (
        <Home />
      ) : (
        <>
          {/* <Layout /> */}
          <Header />
          <Container>
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
        </>
      )}
    </>
  );
}
