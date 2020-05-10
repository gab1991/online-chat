import React, { useState } from 'react';
import validate from '../../../Validation/Validation';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './SignUp.scss';

export default function SignUp(props) {
  const [inputs, setInputs] = useState({
    username: {
      label: 'Username',
      type: 'text',
      placeholder: 'Enter Your Username',
      value: '',
      valid: false,
      invalidMessage: 'Only numbers and letters allowed',
    },
    email: {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email',
      value: '',
      valid: false,
      invalidMessage: 'Invalid email',
    },
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'Enter email password',
      value: '',
      valid: false,
      invalidMessage:
        'Password must contain 4 to 15 chars including at least one number',
    },
    passConfirm: {
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm password',
      value: '',
      valid: false,
      invalidMessage: 'Passwords must match',
    },
  });

  const checkValidity = (name, value) => {
    if (value.length === 0) return false;
    if (name === 'passConfirm') {
      if (inputs.password.value !== value) {
        return false;
      } else {
        return true;
      }
    }
    return validate(name, value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let isEntireFormValid = true;
    for (let name in inputs) {
      if (inputs[name].value.length === 0) {
        setInputs((prevState) => {
          const updState = { ...prevState };
          updState[name].emptyMessage = 'Please fill this field';
          return updState;
        });
      }
      if (!inputs[name].valid) isEntireFormValid = false;
    }
    console.log(isEntireFormValid);
  };

  const inputChangeHandler = (e) => {
    const inputName = e.target.getAttribute('data-name');
    const currentValue = e.target.value;
    const isValid = checkValidity(inputName, currentValue);

    setInputs((prevState) => {
      const updState = { ...prevState };
      updState[inputName].value = currentValue;
      updState[inputName].emptyMessage = null;
      isValid
        ? (updState[inputName].valid = true)
        : (updState[inputName].valid = false);
      return updState;
    });
  };

  console.log(inputs.username.emptyMessage);
  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <h1 className="text-center">SignUp</h1>
        {Object.keys(inputs).map((name) => {
          const input = inputs[name];
          return (
            <Form.Group key={input.label}>
              <Form.Label>{input.label}</Form.Label>
              <Form.Control
                type={input.type}
                placeholder={input.placeholder}
                data-name={name}
                onChange={inputChangeHandler}
                isInvalid={
                  (!input.valid && input.value.length !== 0) ||
                  input.emptyMessage
                }></Form.Control>
              <Form.Control.Feedback type="invalid">
                {input.emptyMessage || input.invalidMessage}
              </Form.Control.Feedback>
            </Form.Group>
          );
        })}
        <Form.Group className="text-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
