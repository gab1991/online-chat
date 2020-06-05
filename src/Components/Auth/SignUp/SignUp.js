import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../Store/Actions/actions';
import { CSSTransition } from 'react-transition-group';
import FadingLinesSpinner from '../../UI/SvgSpinners/FadingLines';
import Input from '../../UI/Inputs/Input/Input';
import Button from '../../UI/Buttons/Button/Button';
import validate from '../../../Validation/Validation';
import HumanIcon from '../../UI/SvgIcons/Human';
import EnvelopeIcon from '../../UI/SvgIcons/Envelope';
import KeyIcon from '../../UI/SvgIcons/Key';
import ConfirmCheckIcon from '../../UI/SvgIcons/ConfirmCheck';
import Backend from '../../../Backend/Backend';
import BackDrop from './Backdrop/Backdrop';
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
      icon: <HumanIcon />,
    },
    email: {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email',
      value: '',
      valid: false,
      invalidMessage: 'Invalid email',
      icon: <EnvelopeIcon />,
    },
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'Enter email password',
      value: '',
      valid: false,
      invalidMessage: 'Must contain 4 to 15 chars and at least one number',
      icon: <KeyIcon />,
    },
    passConfirm: {
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm password',
      value: '',
      valid: false,
      invalidMessage: 'Passwords must match',
      icon: <ConfirmCheckIcon />,
    },
  });
  const [sending, setSending] = useState(false);

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
          updState[name].errMessage = 'Please fill this field';
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
      setSending(true);
      Backend.postSignUp({ ...sendObj })
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

  const inputChangeHandler = (e) => {
    const inputName = e.target.getAttribute('data-name');
    const currentValue = e.target.value;
    const isValid = checkValidity(inputName, currentValue);

    setInputs((prevState) => {
      const updState = { ...prevState };
      updState[inputName].value = currentValue;
      updState[inputName].errMessage = null;
      updState[inputName].errMessage = null;
      isValid
        ? (updState[inputName].valid = true)
        : (updState[inputName].valid = false);
      return updState;
    });
  };

  return (
    <div className={`${styles.SignUp}`}>
      <BackDrop />
      <div className={styles.HeaderSection}>
        <h1>SignUp</h1>
        <h3>TO CONTINUE</h3>
      </div>
      <form className={styles.SignUpForm} onSubmit={submitHandler}>
        {Object.keys(inputs).map((name) => {
          const input = inputs[name];
          return (
            <div className={styles.InputContainer} key={name}>
              <div className={styles.IconContainer}>{input.icon}</div>
              <Input
                name={name}
                type={input.type}
                placeholder={input.placeholder}
                value={input.value}
                className={styles.Input}
                onChange={inputChangeHandler}
                inValid={
                  input.errMessage || (!input.valid && input.value.length > 0)
                }
                inValidMessage={input.errMessage || input.invalidMessage}
              />
            </div>
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
            <Button txtContent={'create account'} className={styles.Button} />
          )}
        </div>
        <a
          className={styles.AccountCreation}
          onClick={props.changeActiveScreen}>
          Already have an account?
        </a>
      </form>
    </div>
  );
}
