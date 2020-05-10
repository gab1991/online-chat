import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Login.scss';

export default function Login(props) {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <h1 className="text-center">Login</h1>
        <Form.Group controlId="email-login">
          <Form.Label>Login/Email address</Form.Label>
          <Form.Control type="text" placeholder="Enter Login/Email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="password-login">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="submit-btn" className="text-center">
          <Button variant="primary" type="submit">
            Go
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
