import { useEffect } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { messagePagestore } from 'pages/messages/model/store';
import { Backdrop } from 'shared/ui';

import { Chats, Menu, MessagesHeader } from './ui';

import styles from './MessagesPage.module.scss';

export const MessagesPage = observer(() => {
	useEffect(() => {
		return (): void => messagePagestore.setShowMenu(false);
	}, []);

	return (
		<div className={styles.Messages}>
			<MessagesHeader />
			<Chats />
			{messagePagestore.showMenu && <Backdrop />}
			<Menu className={cn(styles.slidingMenu, { [styles.slidingMenu_show]: messagePagestore.showMenu })} />
		</div>
	);
});
