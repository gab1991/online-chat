import { Navigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

import { profileStore } from 'shared/model/store';
import { chatsStore } from 'shared/model/store/chats.store';

import { ChatRoomHeader, Message, TypingFooter } from './ui';

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
			<div className={styles.messageArea}>
				{chat.messages.map((msg) => (
					<Message key={msg.id} message={msg} className={styles.message} />
				))}
			</div>
			<TypingFooter chatId={chat.id} profileId={profileId} />
		</div>
	);
});
