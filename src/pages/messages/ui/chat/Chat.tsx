import { AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { IChat } from 'shared/types';

import { profileStore } from 'shared/model/store';
import { Avatar } from 'shared/ui';

import styles from './Chat.module.scss';

interface IChatProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	chat: IChat;
}

export const Chat = observer((props: IChatProps) => {
	const { chat, className, ...htmlProps } = props;

	const chatParticipant = chat.participants.find((participant) => participant.id !== profileStore.profile.id);

	return (
		<Link className={cn(styles.chat, className)} to={`${chat.id}`} {...htmlProps}>
			<Avatar text={chat.title} imgSrc={chat.avatarUrl} className={styles.avatar} />
			<h3 className={styles.dispNameHeader}>{chatParticipant?.displayedName}</h3>
			<p className={styles.messagePreview}>last message</p>
			<p className={styles.time}>15:00</p>
		</Link>
	);
});
