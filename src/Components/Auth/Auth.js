import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import LoginTransitions from './Login/Login.module.scss';
import SignUpTransitions from './SignUp/SignUp.module.scss';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

export default function Auth(props) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(true);

  return (
    <>
      <CSSTransition
        timeout={{ exit: 700, appear: 2000, enter: 2000 }}
        classNames={{ ...LoginTransitions }}
        in={showLogin}
        unmountOnExit
        appear
        onExited={() => setShowSignUp(true)}>
        <Login changeActiveScreen={() => setShowLogin(false)} />
      </CSSTransition>
      <CSSTransition
        timeout={{ exit: 700, appear: 2000, enter: 2000 }}
        in={showSignUp}
        classNames={{ ...SignUpTransitions }}
        unmountOnExit
        appear
        onExited={() => setShowLogin(true)}>
        <SignUp changeActiveScreen={() => setShowSignUp(false)} />
      </CSSTransition>
    </>
  );
}
