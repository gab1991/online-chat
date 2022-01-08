import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Auth, ChatRoomPage, FindContactsPage, MessagesPage, UserSettingsPage } from 'pages';

import 'shared/model/store/reactions';
import 'configs/mobx.config';
import { AuthGuard } from 'processes/authentification';
import { profileStore } from 'shared/model/store';

import styles from './App.module.scss';

export const App = observer(() => {
	useEffect(() => {
		profileStore.fetchCurrentProfile();
	}, []);

	return (
		<div className={styles.App}>
			<Routes>
				<Route path="auth/*" element={<Auth />} />
				<Route
					path="*"
					element={
						<AuthGuard>
							<Route path="/" element={<MessagesPage />} />
							<Route path="/chats/:chatID" element={<ChatRoomPage />} />
							<Route path="/findContact" element={<FindContactsPage />} />
							<Route path="/settings" element={<UserSettingsPage />} />
						</AuthGuard>
					}></Route>
			</Routes>
		</div>
	);
});
