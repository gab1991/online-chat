import { observer } from 'mobx-react';

import { Chat } from '../';
import { chatsStore } from 'shared/model/store/chats.store';

import styles from './Chats.module.scss';

export const Chats = observer(() => {
	const chats = chatsStore.chats;

	return (
		<ul className={styles.chats}>
			{chats.map((chat) => (
				<li key={chat.id}>
					<Chat chat={chat} className={styles.chat} />
				</li>
			))}
		</ul>
	);
});
