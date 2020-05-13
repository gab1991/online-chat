import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../Store/Actions/actions';
import Input from '../../UI/Inputs/Input/Input';
import Button from '../../UI/Buttons/Button/Button';
import validate from '../../../Validation/Validation';
import Backend from '../../../Backend/Backend';
import styles from './SignUp.module.scss';

export default function SignUp(props) {
  const dispatch = useDispatch();
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
    if (isEntireFormValid) {
      const sendObj = {
        username: inputs.username.value,
        password: inputs.password.value,
        email: inputs.email.value,
      };
      Backend.postSignUp({ ...sendObj })
        .then((res) => {
          const username = res.data.username;
          const authToken = res.headers['auth-token'];
          dispatch(logIn(username, authToken));
          localStorage.setItem('token', authToken);
          localStorage.setItem('username', username);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
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

  return (
    <div className={`${styles.SignUp}`}>
      <form onSubmit={submitHandler}>
        <h1>SignUp</h1>
        {Object.keys(inputs).map((name) => {
          const input = inputs[name];
          return (
            <Input
              key={name}
              name={name}
              label={input.label}
              type={input.type}
              placeholder={input.placeholder}
              value={input.value}
              onChange={inputChangeHandler}
              inValid={!input.valid && input.value.length > 0}
              inValidMessage={input.invalidMessage}
            />
          );
        })}
        <div className={styles.ButtonContainer}>
          <Button txtContent={'Submit'} />
        </div>
      </form>
    </div>
  );
}
// label: 'Username',
// type: 'text',
// placeholder: 'Enter Your Username',
// value: '',
// valid: false,
// invalidMessage: 'Only numbers and letters allowed',
