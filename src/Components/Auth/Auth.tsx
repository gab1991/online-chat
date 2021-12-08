import { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { Login } from './Login/Login';
import { SignUp } from './SignUp/SignUp';

import LoginTransitions from './Login/Login.module.scss';
import SignUpTransitions from './SignUp/SignUp.module.scss';

export function Auth() {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const loginMatch = pathname.match(/login$/i);
	const signupMatch = pathname.match(/signup$/i);

	const [inTransition, setInTransition] = useState(false);

	return (
		<Routes>
			<Route
				path="login"
				element={
					<CSSTransition
						timeout={{ appear: 2000, enter: 2000, exit: 700 }}
						classNames={{ ...LoginTransitions }}
						in={loginMatch && !inTransition}
						unmountOnExit
						appear
						onExited={() => {
							navigate('signup');
							setInTransition(false);
						}}>
						<Login
							changeActiveScreen={() => {
								setInTransition(true);
							}}
						/>
					</CSSTransition>
				}></Route>
			<Route
				path="signup"
				element={
					<CSSTransition
						timeout={{ appear: 2000, enter: 1000, exit: 700 }}
						in={signupMatch && !inTransition}
						classNames={{ ...SignUpTransitions }}
						unmountOnExit
						appear
						onExited={() => {
							navigate('login');
							setInTransition(false);
						}}>
						<SignUp changeActiveScreen={() => setInTransition(true)} />
					</CSSTransition>
				}></Route>
		</Routes>
	);
}
