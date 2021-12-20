import { HTMLAttributes } from 'react';
import cn from 'classnames';

import { IMessage } from 'shared/types';

import styles from './Message.module.scss';

interface IMessageProps extends HTMLAttributes<HTMLDivElement> {
	message: IMessage;
}

export function Message(props: IMessageProps) {
	const { message, className, ...htmlProps } = props;

	const time = `${new Date(message.createdAt).getHours()}:${new Date(message.createdAt).getMinutes()}`;

	return (
		<p className={cn(styles.message, className)} {...htmlProps}>
			{message.message}
			<span className={styles.time}>{time}</span>
		</p>
	);
}
