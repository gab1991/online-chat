import { useEffect, useLayoutEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { ChatsContextProvider } from './model/context';
import { useScroll } from 'shared/lib';
import { chatsStore, profileStore } from 'shared/model/store';
import { ArrowSvg, GradientButton } from 'shared/ui';

import { ChatRoomHeader, Message, TypingFooter } from './ui';

import styles from './ChatRoomPage.module.scss';

export const ChatRoomPage = observer(() => {
	const { chatID } = useParams();
	const chat = chatsStore.getChatById(Number(chatID) || 0);
	const msgAreaRef = useRef<HTMLDivElement>(null);
	const profileId = profileStore.profile.id;
	const messagesLength = chat?.messages.length || 0;
	const lastMsg = chat?.messages[messagesLength - 1];
	const isLastMsgMine = lastMsg?.senderId === profileId;
	const unseenCount = chatsStore.getUnseenMsgCount(chat?.id);

	const { scrollToBottom } = useScroll(msgAreaRef);

	useEffect(() => {
		isLastMsgMine && scrollToBottom('smooth');
	}, [isLastMsgMine, scrollToBottom, messagesLength]);

	useLayoutEffect(() => {
		scrollToBottom();
	}, [scrollToBottom]);

	if (!chat || !profileId) {
		return <Navigate to={'/'} />;
	}

	const onNewMessagesClick = (): void => scrollToBottom('smooth');
	const isDisplayingNewMsgBtn = !!unseenCount && !isLastMsgMine;

	return (
		<div className={styles.chatRoomPage}>
			<ChatRoomHeader chat={chat} />
			<CSSTransition timeout={500} classNames={{ ...styles }} in={true} unmountOnExit appear>
				<div className={styles.messageArea} ref={msgAreaRef}>
					<ChatsContextProvider chatId={chat.id}>
						{chat.messages.map((msg) => {
							const isCurrentUserMsg = msg.senderId === profileId;
							return (
								<Message
									key={msg.id}
									message={msg}
									className={cn(styles.message, { [styles.message_leftCornered]: !isCurrentUserMsg })}
									leftCornered={!isCurrentUserMsg}
									msgsContainerRef={msgAreaRef}
								/>
							);
						})}
					</ChatsContextProvider>
					{isDisplayingNewMsgBtn && (
						<GradientButton className={styles.newMessagePopUp} onClick={onNewMessagesClick}>
							New Messages <ArrowSvg className={styles.arrowSvg} />
						</GradientButton>
					)}
				</div>
			</CSSTransition>
			<TypingFooter chatId={chat.id} profileId={profileId} />
		</div>
	);
});
