import { useState } from 'react';
import { observer } from 'mobx-react';

import { HamburgerBar } from '../hamburgerBar';
import { messagePagestore } from 'pages/messages/model/store';
import { SearchBar } from 'shared/ui';

import styles from './MessagesHeader.module.scss';

export const MessagesHeader = observer(() => {
	const [inputValue, setInputValue] = useState('');

	const onBackArrowClick = (): void => messagePagestore.setShowSearchHeader(false);

	return (
		<header className={styles.header}>
			{messagePagestore.showSearchHeader ? (
				<SearchBar
					onBackArrowClick={onBackArrowClick}
					placeholder="Search messages"
					value={inputValue}
					onValueChange={setInputValue}
				/>
			) : (
				<HamburgerBar />
			)}
		</header>
	);
});
