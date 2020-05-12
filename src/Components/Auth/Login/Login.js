import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { logIn } from '../../../Store/Actions/actions';
import { useDispatch } from 'react-redux';
import Backend from '../../../Backend/Backend';
import validate from '../../../Validation/Validation';

import './Login.scss';

export default function Login(props) {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    username_email: {
      label: 'Username/Email',
      type: 'text',
      placeholder: 'Enter Your username or email',
      value: '',
      valid: false,
      invalidMessage: 'Only numbers and letters allowed',
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
  });
  const submitHandler = (e) => {
    e.preventDefault();

    let isEntireFormValid = true;
    for (let name in inputs) {
      if (inputs[name].value.length === 0) {
        setInputs((prevState) => {
          const updState = { ...prevState };
          updState[name].wrongMessage = 'Please fill this field';
          return updState;
        });
      }
      if (!inputs[name].valid) isEntireFormValid = false;
    }
    console.log(isEntireFormValid);
    if (isEntireFormValid) {
      const sendObj = {
        username_email: inputs.username_email.value,
        password: inputs.password.value,
      };
      Backend.postLogin({ ...sendObj })
        .then((res) => {
          const username = res.data.username;
          const authToken = res.headers['auth-token'];
          dispatch(logIn(username, authToken));
          localStorage.setItem('token', authToken);
          localStorage.setItem('username', username);
        })
        .catch((err) => {
          let wrongInput = err.response.data.field;
          let errMessage;
          if (wrongInput === 'username_email') errMessage = 'No such user';
          if (wrongInput === 'password') errMessage = 'Wrong password';

          setInputs((prevState) => {
            const updinputs = { ...prevState };
            updinputs[wrongInput].wrongMessage = errMessage;
            return updinputs;
          });
        });
    }
  };

  const checkValidity = (name, value) => {
    if (value.length === 0) return false;
    return validate(name, value);
  };

  const inputChangeHandler = (e) => {
    const inputName = e.target.getAttribute('data-name');
    const currentValue = e.target.value;
    const isValid = checkValidity(inputName, currentValue);

    setInputs((prevState) => {
      const updState = { ...prevState };
      updState[inputName].value = currentValue;
      updState[inputName].wrongMessage = null;
      isValid
        ? (updState[inputName].valid = true)
        : (updState[inputName].valid = false);
      return updState;
    });
  };

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <h1 className="text-center">Login</h1>
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
                  input.wrongMessage
                }></Form.Control>
              <Form.Control.Feedback type="invalid">
                {input.wrongMessage || input.invalidMessage}
              </Form.Control.Feedback>
            </Form.Group>
          );
        })}
        <Form.Group controlId="submit-btn" className="text-center">
          <Button variant="primary" type="submit">
            Go
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
