import { Navigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

import { chatsStore, profileStore } from 'shared/model/store';

import { ChatRoomHeader, MessageArea, TypingFooter } from './ui';

import styles from './ChatRoomPage.module.scss';

export const ChatRoomPage = observer(() => {
	const { chatID } = useParams();
	const chat = chatsStore.getChatById(Number(chatID) || 0);

	const profileId = profileStore.profile.id;

	if (!chat || !profileId) {
		return <Navigate to={'/'} />;
	}

	return (
		<div className={styles.chatRoomPage}>
			<ChatRoomHeader chat={chat} />
			<MessageArea chat={chat} />
			<TypingFooter chatId={chat.id} profileId={profileId} />
		</div>
	);
});
