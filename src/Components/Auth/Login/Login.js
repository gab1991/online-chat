import React, { useState } from 'react';
import { logIn, updateProfile } from '../../../Store/Actions/actions';
import { fillChats } from '../../../Store/Actions/chatActions';
import { useDispatch } from 'react-redux';
import Backend from '../../../Backend/Backend';
import Checkbox from '../../UI/Inputs/Checkbox/Checkbox';
import Backdrop from './Backdrop/Backdrop';
import HumanIcon from '../../UI/SvgIcons/Human';
import KeyIcon from '../../UI/SvgIcons/Key';
import Input from '../../UI/Inputs/Input/Input';
import Button from '../../UI/Buttons/Button/Button';
import validate from '../../../Validation/Validation';
import FadingLinesSpinner from '../../UI/SvgSpinners/FadingLines';
import styles from '../Login/Login.module.scss';

function getProfileInfo(token, dispatch) {
  Backend.getProfile(token).then((res) => {
    const profile = {
      avatar_path: res.data.avatar_path,
      id: res.data.id,
      username: res.data.username,
      displayed_name: res.data.displayed_name,
    };
    const conversations = {
      ...res.data.conversations,
    };
    dispatch(updateProfile(profile));
    dispatch(fillChats(conversations));
  });
}

export default function Login(props) {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    username_email: {
      label: 'Username/Email',
      type: 'text',
      placeholder: 'Enter username or email',
      value: '',
      valid: false,
      invalidMessage: 'Only numbers and letters allowed',
      icon: <HumanIcon />,
    },
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
      value: '',
      valid: false,
      invalidMessage:
        'Password must contain 4 to 15 chars including at least one number',
      icon: <KeyIcon />,
    },
  });
  const [sending, setSending] = useState(false);
  const [saveUser, setSaveUser] = useState(false);

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
          getProfileInfo(authToken, dispatch);
          if (saveUser) {
            localStorage.setItem('token', authToken);
            localStorage.setItem('username', username);
          }
        })
        .catch((err) => {
          setSending(false);

          if (!err?.response) {
            alert('service unavailable! Try again later');
          } else {
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
          }
        });
    }
  };
  const checkValidity = (name, value) => {
    if (value.length === 0) return false;
    return validate(name, value);
  };

  const rememberUser = (e) => {
    setSaveUser(e.target.checked);
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
      <Backdrop />
      <div className={styles.HeaderSection}>
        <h1>Log In</h1>
        <h3>TO CONTINUE</h3>
      </div>
      <form className={styles.Form} onSubmit={submitHandler}>
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
        <Checkbox
          txt={`Remember me`}
          className={styles.Checkbox}
          onChange={rememberUser}
          checked={saveUser}
        />
        <div className={styles.ButtonContainer}>
          {sending ? (
            <div className={styles.SpinnerContainer}>
              <FadingLinesSpinner />
            </div>
          ) : (
            <Button txtContent={'LOG IN'} className={styles.Button} light />
          )}
        </div>
        <button
          className={styles.AccountCreation}
          onClick={(e) => {
            e.preventDefault();
            props.changeActiveScreen.apply(this, [...arguments]);
          }}>
          Do not have an account?
        </button>
      </form>
    </div>
  );
}

export { getProfileInfo };
