import React, { lazy, Suspense, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { autorun, configure } from 'mobx';
import { observer } from 'mobx-react';
import { ChatRoomPage, MessagesPage } from 'pages';

import PropTypes, { bool, object } from 'prop-types';

import AudioComponent from './Components/AudioComponent/AudioComponent';
import Loading from './Components/Loading/Loading';
import { fetchCurrentUserProfile } from './shared/model/store/Actions/actions';
import { isEmptyObj } from './Utils/Utils';
import { Auth } from 'Components/Auth/Auth';
import { AuthGuard } from 'processes/authentification';
import { chatsStore, profileStore } from 'shared/model/store';

configure({
	// computedRequiresReaction: true,
	// disableErrorBoundaries: true,
	enforceActions: 'always',
	// observableRequiresReaction: true,
	// reactionRequiresObservable: true,
});

import { profile } from 'console';

import { eventEmmiter } from 'shared/api';

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

// export const location = new ReactLocation();

export const App = observer(() => {
	useEffect(() => {
		profileStore.fetchCurrentProfile();
	}, []);

	const profileId = profileStore.profile.id;

	useEffect(() => {
		if (profileId && chatsStore.chats.length && profileStore.isConnected) {
			eventEmmiter.joinChats({ chatIds: chatsStore.chats.map((chat) => chat.id), profileId });
		}
	}, [chatsStore.chats, profileId, profileStore.isConnected]);

	useEffect(() => {
		console.log('profile ' + profileStore.isConnected);
		chatsStore.fetchLastSeenMsgs();
	}, [profileStore.isConnected]);

	useEffect(() => {
		//refetch chats on recconect
		if (profileStore.isConnected && profileStore.profile.id) {
			chatsStore.fetchChats();
		}
	}, [profileStore.isConnected, profileStore.profile.id]);

	return (
		<div className={styles.mobileRestrainer}>
			<div className={styles.App}>
				<Routes>
					<Route path="auth/*" element={<Auth />} />
					<Route
						path="*"
						element={
							<AuthGuard>
								<Route path="/" element={<MessagesPage />} />
								<Route path="/chats/:chatID" element={<ChatRoomPage />} />
							</AuthGuard>
						}></Route>
				</Routes>
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
