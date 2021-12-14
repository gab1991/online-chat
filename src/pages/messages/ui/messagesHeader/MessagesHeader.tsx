import { observer } from 'mobx-react';

import { SearchBar } from '../';
import { HamburgerBar } from '../hamburgerBar';
import { messagePagestore } from 'pages/messages/model/store';

import styles from './MessagesHeader.module.scss';

export const MessagesHeader = observer(() => {
	return (
		<header className={styles.header}>{messagePagestore.showSearchHeader ? <SearchBar /> : <HamburgerBar />}</header>
	);
});
