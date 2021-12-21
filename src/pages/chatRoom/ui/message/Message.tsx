import { HTMLAttributes } from 'react';
import cn from 'classnames';

import { IMessage } from 'shared/types';

import { getHHMMtime } from 'shared/lib';

import styles from './Message.module.scss';

interface IMessageProps extends HTMLAttributes<HTMLDivElement> {
	leftCornered?: boolean;
	message: IMessage;
}

export function Message(props: IMessageProps) {
	const { message, className, leftCornered, ...htmlProps } = props;

	return (
		<p className={cn(styles.message, { [styles.message_leftCornered]: leftCornered }, className)} {...htmlProps}>
			{message.message}
			<span className={styles.time}>{getHHMMtime()}</span>
		</p>
	);
}
