import { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { Login, SignUp } from './pages';

import LoginTransitions from './pages/login/LoginPage.module.scss';
import SignUpTransitions from './pages/signUp/SignUpPage.module.scss';

const moduleRoutes = {
	login: 'login',
	signup: 'signup',
};

export function Auth(): JSX.Element {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const loginMatch = pathname.match(new RegExp(`${moduleRoutes.login}$`, 'i'));
	const signupMatch = pathname.match(new RegExp(`${moduleRoutes.signup}$`, 'i'));

	const [inTransition, setInTransition] = useState(false);

	return (
		<Routes>
			<Route
				path={moduleRoutes.login}
				element={
					<CSSTransition
						timeout={{ appear: 2000, enter: 2000, exit: 700 }}
						classNames={{ ...LoginTransitions }}
						in={!!loginMatch && !inTransition}
						unmountOnExit
						appear
						onExited={(): void => {
							navigate(moduleRoutes.signup);
							setInTransition(false);
						}}>
						<Login
							changeActiveScreen={(): void => {
								setInTransition(true);
							}}
						/>
					</CSSTransition>
				}></Route>
			<Route
				path={moduleRoutes.signup}
				element={
					<CSSTransition
						timeout={{ appear: 2000, enter: 1000, exit: 700 }}
						in={!!signupMatch && !inTransition}
						classNames={{ ...SignUpTransitions }}
						unmountOnExit
						appear
						onExited={(): void => {
							navigate(moduleRoutes.login);
							setInTransition(false);
						}}>
						<SignUp changeActiveScreen={(): void => setInTransition(true)} />
					</CSSTransition>
				}></Route>
		</Routes>
	);
}
