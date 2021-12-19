import { Navigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

import { chatsStore } from 'shared/model/store/chats.store.';

import { ChatRoomHeader, TypingFooter } from './ui';

import styles from './ChatRoomPage.module.scss';

export const ChatRoomPage = observer(() => {
	const { chatID } = useParams();
	const chat = chatsStore.getChatById(Number(chatID) || 0);

	if (!chat) {
		return <Navigate to={'/'} />;
	}

	return (
		<div className={styles.chatRoomPage}>
			<ChatRoomHeader chat={chat} />
			<div className={styles.messageArea}>{chat.messages.map((msg) => console.log(msg))}</div>
			<TypingFooter />
		</div>
	);
});
