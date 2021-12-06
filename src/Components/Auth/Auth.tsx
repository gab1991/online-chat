import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Login } from './Login/Login';
import { SignUp } from './SignUp/SignUp';

import LoginTransitions from './Login/Login.module.scss';
import SignUpTransitions from './SignUp/SignUp.module.scss';

export function Auth() {
	const [showLogin, setShowLogin] = useState(true);
	const [showSignUp, setShowSignUp] = useState(false);

	return (
		<>
			<CSSTransition
				timeout={{ appear: 2000, enter: 2000, exit: 700 }}
				classNames={{ ...LoginTransitions }}
				in={showLogin}
				unmountOnExit
				appear
				onExited={() => setShowSignUp(true)}>
				<Login changeActiveScreen={() => setShowLogin(false)} />
			</CSSTransition>
			<CSSTransition
				timeout={{ appear: 2000, enter: 1000, exit: 700 }}
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
