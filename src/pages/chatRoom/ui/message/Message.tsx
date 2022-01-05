import { HTMLAttributes, useEffect, useRef } from 'react';
import cn from 'classnames';

import { IMessage } from 'shared/types';

import { useChatsContext } from 'pages/chatRoom/model/context';
import { getHHMMtime, useEffectCallback, useIntersectionObserver } from 'shared/lib';

import styles from './Message.module.scss';

interface IMessageProps extends HTMLAttributes<HTMLDivElement> {
	leftCornered?: boolean;
	message: IMessage;
	msgsContainerRef?: React.MutableRefObject<HTMLElement | null>;
}

export function Message(props: IMessageProps): JSX.Element {
	const { message, className, leftCornered, msgsContainerRef, ...htmlProps } = props;
	const { setVisibility, lastSeenMsgId } = useChatsContext();
	const isConvPartnerMsgSeen = lastSeenMsgId && leftCornered && lastSeenMsgId >= message.id;

	const msgRef = useRef<HTMLParagraphElement>(null);

	const { isVisible } = useIntersectionObserver({ parentRef: msgsContainerRef, ref: msgRef });

	const setVisibilityMemo = useEffectCallback(setVisibility);

	useEffect(() => {
		setVisibilityMemo(message.id, isVisible);
	}, [isVisible, setVisibilityMemo, message.id]);

	return (
		<p
			className={cn(
				styles.message,
				{ [styles.message_leftCornered]: leftCornered, [styles.message_isSeen]: isConvPartnerMsgSeen },
				className,
			)}
			ref={msgRef}
			{...htmlProps}>
			{message.message}
			<span className={styles.time}>{getHHMMtime(message.createdAt)}</span>
		</p>
	);
}
