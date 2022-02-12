import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Home from "../Home";
import { signup } from "../../actions";

import Layout from "../../components/Layout/index,";

export default function Signup() {
  const navigete = useNavigate();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  let authen = auth.authenticate;
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if (user.loading) {
    return <p>Loading .....!</p>;
  }

  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(user));
    setTimeout(() => {
      navigete("/");
    }, 400);
  };
  return (
    <>
      {authen ? (
        <Home />
      ) : (
        <Layout>
           <Container style={{ marginTop: "6rem" }}>
            {user.message}
            <Row className="mt-5">
              <Col md={{ span: 6, offset: 3 }}>
                <Form onSubmit={userSignup}>
                  <Row>
                    <Col md={6}>
                      <Input
                        label="First Name"
                        type="text"
                        placeholder="FirstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Col>
                    <Col md={6}>
                      <Input
                        label="Last Name"
                        type="text"
                        placeholder="LastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Col>
                  </Row>
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
