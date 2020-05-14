import React, { useState } from 'react';
import { logIn } from '../../../Store/Actions/actions';
import { useDispatch } from 'react-redux';
import Backend from '../../../Backend/Backend';
import Input from '../../UI/Inputs/Input/Input';
import Button from '../../UI/Buttons/Button/Button';
import validate from '../../../Validation/Validation';
import FadingLinesSpinner from '../../UI/SvgSpinners/FadingLInesSpinner/FadingLines';
import styles from '../Login/Login.module.scss';

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
      placeholder: 'Enter email',
      value: '',
      valid: false,
      invalidMessage:
        'Password must contain 4 to 15 chars including at least one number',
    },
  });
  const [sending, setSending] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    let isEntireFormValid = true;
    for (let name in inputs) {
      if (inputs[name].value.length === 0) {
        setInputs((prevState) => {
          const updState = { ...prevState };
          updState[name].errMessage = 'Please fill this field';
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

      setSending(true);
      Backend.postLogin({ ...sendObj })
        .then((res) => {
          setSending(false);

          const username = res.data.username;
          const authToken = res.headers['auth-token'];
          dispatch(logIn(username, authToken));
          localStorage.setItem('token', authToken);
          localStorage.setItem('username', username);
        })
        .catch((err) => {
          setSending(false);

          const errMessage = err.response.data.err_message;
          const errInput = err.response.data.field;

          if (errInput && errMessage) {
            setInputs((prevState) => {
              const updState = { ...prevState };
              updState[errInput].errMessage = errMessage;
              updState[errInput].valid = false;
              return updState;
            });
          }
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
      updState[inputName].errMessage = null;
      isValid
        ? (updState[inputName].valid = true)
        : (updState[inputName].valid = false);
      return updState;
    });
  };

  return (
    <div className={`${styles.Login}`}>
      <form onSubmit={submitHandler}>
        <h1>Login</h1>
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
              inValid={
                input.errMessage || (!input.valid && input.value.length > 0)
              }
              inValidMessage={input.errMessage || input.invalidMessage}
            />
          );
        })}
        <div className={styles.ButtonContainer}>
          {sending ? (
            <div className={styles.SpinnerContainer}>
              <FadingLinesSpinner
                style={{ position: 'absolute', top: '0', left: '0' }}
              />
            </div>
          ) : (
            <Button txtContent={'Submit'} />
          )}
        </div>
      </form>
    </div>
  );
}
