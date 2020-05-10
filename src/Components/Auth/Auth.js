import React, { useState } from 'react';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

export default function Auth(props) {
  const [activeScreen, setActiveScreen] = useState('SignUp');

  return <div> {activeScreen === 'SignUp' ? <SignUp /> : <Login />}</div>;
}
