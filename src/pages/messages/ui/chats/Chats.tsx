import { CSSTransition } from 'react-transition-group';
import { observer } from 'mobx-react';

import { Chat } from '../';
import { chatsStore } from 'shared/model/store/chats.store';

import styles from './Chats.module.scss';

export const Chats = observer(() => {
	const chats = chatsStore.chats;

	return (
		<ul className={styles.chats}>
			{chats.map((chat) => (
				<CSSTransition
					key={chat.id}
					timeout={500}
					classNames={{ ...styles }}
					in={!!chat.messages.length}
					unmountOnExit
					appear>
					<li>
						<Chat chat={chat} className={styles.chat} />
					</li>
				</CSSTransition>
			))}
		</ul>
	);
});
