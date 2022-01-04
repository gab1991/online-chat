import { useEffect, useLayoutEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { ChatsContextProvider } from './model/context';
import { useTraverseFoundMsgs } from './model/hooks';
import { useScroll } from 'shared/lib';
import { chatsStore, profileStore } from 'shared/model/store';
import { ArrowSvg, EmptyBtn, GradientBlock, GradientButton } from 'shared/ui';

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

	const foundMsgs = chatsStore.getFoundMsgsInChat(chat?.id || 0);
	const showMsgSearch = !!chatsStore.searchMsgStr;

	const { selected, selectPrev, selectNext, stats } = useTraverseFoundMsgs(foundMsgs.map((ms) => ms.id));

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
									id={`msg_${msg.id}`}
									key={msg.id}
									message={msg}
									className={cn(styles.message, {
										[styles.message_leftCornered]: !isCurrentUserMsg,
										[styles.message_selected]: showMsgSearch && selected === msg.id,
									})}
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
					{showMsgSearch && (
						<GradientBlock className={styles.foundSelector}>
							<EmptyBtn className={styles.arrowBtn} onClick={selectNext}>
								<ArrowSvg className={styles.arrowSvg} />
							</EmptyBtn>
							{`${stats.current} of ${stats.total}`}
							<EmptyBtn className={styles.arrowBtn} onClick={selectPrev}>
								<ArrowSvg className={cn(styles.arrowSvg, styles.arrowSvg_reverted)} />
							</EmptyBtn>
						</GradientBlock>
					)}
				</div>
			</CSSTransition>
			<TypingFooter chatId={chat.id} profileId={profileId} />
		</div>
	);
});
