import { useEffect, useLayoutEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { IChat } from 'shared/types';

import { Message } from '../';
import { FoundMsgsFloater } from '../foundMsgsFloater';
import { ChatsContextProvider } from 'pages/chatRoom/model/context';
import { useTraverseFoundMsgs } from 'pages/chatRoom/model/hooks';
import { useScroll } from 'shared/lib';
import { chatsStore, profileStore } from 'shared/model/store';
import { ArrowSvg, GradientButton } from 'shared/ui';

import styles from './MessageArea.module.scss';

interface IMessageAreaProps {
	chat: IChat;
}

export const MessageArea = observer((props: IMessageAreaProps) => {
	const { chat } = props;
	const profileId = profileStore.profile.id;
	const messagesLength = chat.messages.length || 0;
	const lastMsg = chat.messages[messagesLength - 1];
	const isLastMsgMine = lastMsg?.senderId === profileId;
	const unseenCount = chatsStore.getUnseenMsgCount(chat.id);
	const msgAreaRef = useRef<HTMLDivElement>(null);

	const { scrollToBottom } = useScroll(msgAreaRef);

	useEffect(() => {
		isLastMsgMine && scrollToBottom('smooth');
	}, [isLastMsgMine, scrollToBottom, messagesLength]);

	useLayoutEffect(() => {
		scrollToBottom();
	}, [scrollToBottom]);

	const onNewMessagesClick = (): void => scrollToBottom('smooth');
	const isDisplayingNewMsgBtn = !!unseenCount && !isLastMsgMine;

	const foundMsgs = chatsStore.getFoundMsgsInChat(chat.id || 0);

	const { selected, selectPrev, selectNext, stats } = useTraverseFoundMsgs(foundMsgs.map((ms) => ms.id));

	const showMsgSearch = !!chatsStore.searchMsgStr;

	return (
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
					<FoundMsgsFloater
						className={styles.foundSelector}
						onLeftArrowClick={selectPrev}
						onRightArrowClick={selectNext}>{`${stats.current} of ${stats.total}`}</FoundMsgsFloater>
				)}
			</div>
		</CSSTransition>
	);
});
