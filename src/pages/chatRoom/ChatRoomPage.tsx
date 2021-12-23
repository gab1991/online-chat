import { useEffect, useLayoutEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { useScroll } from 'shared/lib';
import { profileStore } from 'shared/model/store';
import { chatsStore } from 'shared/model/store/chats.store';

import { ChatRoomHeader, Message, TypingFooter } from './ui';

import styles from './ChatRoomPage.module.scss';

export const ChatRoomPage = observer(() => {
	const { chatID } = useParams();
	const chat = chatsStore.getChatById(Number(chatID) || 0);
	const msgAreaRef = useRef<HTMLDivElement>(null);
	const profileId = profileStore.profile.id;
	const isLastMsgMine = chat?.messages[chat.messages.length - 1].senderId === profileId;

	const { scrollToBottom } = useScroll(msgAreaRef);

	useEffect(() => {
		if (isLastMsgMine) {
			scrollToBottom('smooth');
		}
	}, [isLastMsgMine, scrollToBottom, chat?.messages.length]);

	useLayoutEffect(() => {
		scrollToBottom();
	}, [scrollToBottom]);

	if (!chat || !profileId) {
		return <Navigate to={'/'} />;
	}

	return (
		<div className={styles.chatRoomPage}>
			<ChatRoomHeader chat={chat} />
			<div className={styles.messageArea} ref={msgAreaRef}>
				{chat.messages.map((msg) => {
					const isCurrentUserMsg = msg.senderId === profileId;
					return (
						<Message
							key={msg.id}
							message={msg}
							className={cn(styles.message, { [styles.message_leftCornered]: !isCurrentUserMsg })}
							leftCornered={!isCurrentUserMsg}
						/>
					);
				})}
			</div>
			<TypingFooter chatId={chat.id} profileId={profileId} />
		</div>
	);
});
