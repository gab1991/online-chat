/* eslint-disable @typescript-eslint/no-magic-numbers */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { IChat } from 'shared/types';

import { Message } from '../';
import { DateFloater } from '../dateFloater';
import { FoundMsgsFloater } from '../foundMsgsFloater';
import { useTraverseFoundMsgs } from 'pages/chatRoom/model/hooks';
import { useScroll, useTimeout } from 'shared/lib';
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
	const [showDateFloater, setShowDateFloater] = useState(false);
	const { setTimeout, clearTimeout } = useTimeout();

	const { scrollToBottom, hasScroll } = useScroll(msgAreaRef);

	useEffect(() => {
		isLastMsgMine && scrollToBottom('smooth');
	}, [isLastMsgMine, scrollToBottom, messagesLength]);

	useLayoutEffect(() => {
		scrollToBottom();
	}, [scrollToBottom]);

	useEffect(() => {
		const handler = (): void => setShowDateFloater(false);

		if (showDateFloater) {
			setTimeout(handler, 1500);
		}
		return (): void => {
			showDateFloater && clearTimeout(handler);
		};
	}, [setTimeout, showDateFloater, clearTimeout]);

	const onNewMessagesClick = (): void => scrollToBottom('smooth');
	const isDisplayingNewMsgBtn = hasScroll && !!unseenCount && !isLastMsgMine;

	const foundMsgs = chatsStore.getFoundMsgsInChat(chat.id || 0);
	const msgIds = foundMsgs.map((ms) => ms.id);

	const { selected, selectPrev, selectNext, stats } = useTraverseFoundMsgs(msgIds);

	const showMsgSearch = !!chatsStore.getFoundMsgsInChat(chat.id).length;

	const onMessageAreaWheel = (): void => {
		chat.messages.length && setShowDateFloater(true);
	};

	return (
		<CSSTransition timeout={500} classNames={{ ...styles }} in={true} unmountOnExit appear>
			<div
				className={styles.messageArea}
				ref={msgAreaRef}
				onWheel={onMessageAreaWheel}
				onTouchStart={onMessageAreaWheel}>
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
				<DateFloater messages={chat.messages} className={styles.dateFloater} show={showDateFloater} />
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
