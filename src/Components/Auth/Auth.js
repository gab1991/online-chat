import React, { useState } from 'react';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

export default function Auth(props) {
  const [activeScreen, setActiveScreen] = useState('Login');
  const changeCurrentScreen = () => {};
  return (
    <>
      {activeScreen === 'SignUp' ? (
        <SignUp changeActiveScreen={() => setActiveScreen('Login')} />
      ) : (
        <Login changeActiveScreen={() => setActiveScreen('SignUp')} />
      )}
    </>
  );
}
