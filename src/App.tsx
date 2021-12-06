import React, { lazy, Suspense, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';

import PropTypes, { bool, object } from 'prop-types';

import Socket, { chatSocket } from './Backend/Socket';
import AudioComponent from './Components/AudioComponent/AudioComponent';
import Loading from './Components/Loading/Loading';
import { fetchCurrentUserProfile } from './store/Actions/actions';
import { isEmptyObj } from './Utils/Utils';
import { Auth } from 'Components/Auth/Auth';

import { profileStore } from './store';

import styles from './App.module.scss';

// const ReactLazyPreload = (importStatement: any) => {
// 	const Component: any = lazy(importStatement);
// 	Component.preload = importStatement;
// 	return Component;
// };

// const ChatRoom = ReactLazyPreload(() => import('./Components/ChatRoom/ChatRoom'));
// const FindContact = ReactLazyPreload(() => import('./Components/FindContact/FindContact'));
// const Auth = ReactLazyPreload(() => import('./Components/Auth/Auth'));
// const UserSettings = ReactLazyPreload(() => import('./Components/UserSettings/UserSettings'));
// const Messages = ReactLazyPreload(() => import('./Components/Messages/Messages'));

export const IS_PROD = process.env.NODE_ENV === 'production' ? true : false;

export const App = observer(() => {
	// const { isLogged, conversations, token, profile } = props;
	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (isEmptyObj(conversations)) return;
	// }, [conversations]);

	// useEffect(() => {
	// 	if (!profile.id) {
	// 		return;
	// 	}

	// 	chatSocket.emit('subscribeToChats', profile.id);
	// 	chatSocket.emit('setIsOnlineToServer', profile.id);
	// }, [profile.id]);

	// useEffect(() => {
	// 	// if (!token) return;
	// 	dispatch(fetchCurrentUserProfile());
	// }, [token, dispatch]);

	return (
		<div className={styles.mobileRestrainer}>
			<div className={styles.App}>
				<Switch>
					<Route path="/">
						<Auth />
					</Route>
				</Switch>
				{/* <Suspense fallback={<Loading />}>
					{!isLogged.status && !isLogged.initialLoading && <Route path="/" component={Auth} />}
					{!isLogged.status && <Route path="/" component={Auth} />}
					{isLogged.status && (
						<Switch>
							 <Route path="/chats/:chatID?" component={ChatRoom} />
							<Route path="/findContact" component={FindContact} />
							<Route path="/userSettings" component={UserSettings} />
							<Route path="/" component={Messages} />
						</Switch>
					)} 
				</Suspense>
				<AudioComponent /> */}
			</div>
		</div>
	);
});
