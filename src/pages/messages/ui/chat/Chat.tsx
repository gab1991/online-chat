import { AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { IChat, IMessage } from 'shared/types';

import { getHHMMtime } from 'shared/lib';
import { profileStore } from 'shared/model/store';
import { Avatar } from 'shared/ui';

import styles from './Chat.module.scss';

interface IChatProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	chat: IChat;
}

export const Chat = observer((props: IChatProps) => {
	const { chat, className, ...htmlProps } = props;

	const chatParticipant = chat.participants.find((participant) => participant.id !== profileStore.profile.id);
	const lastMsg: IMessage | undefined = chat.messages[chat.messages.length - 1];

	return (
		<Link className={cn(styles.chat, className)} to={`chats/${chat.id}`} {...htmlProps}>
			<Avatar text={chat.title} imgSrc={chat.avatarUrl} className={styles.avatar} />
			<h3 className={styles.dispNameHeader}>{chatParticipant?.displayedName}</h3>
			{lastMsg && <p className={styles.messagePreview}>{lastMsg.message}</p>}
			{lastMsg && <p className={styles.time}>{getHHMMtime(lastMsg.createdAt)}</p>}
		</Link>
	);
});
