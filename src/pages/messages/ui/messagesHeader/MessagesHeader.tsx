import { useEffect } from 'react';
import { observer } from 'mobx-react';

import { HamburgerBar } from '../hamburgerBar';
import { useSearchMessages } from 'pages/messages/model/hooks';
import { messagePagestore } from 'pages/messages/model/store';
import { SearchBar } from 'shared/ui';

import styles from './MessagesHeader.module.scss';

export const MessagesHeader = observer(() => {
	const { onChange, searchValue, isSearching } = useSearchMessages();

	useEffect(() => {
		messagePagestore.setSearchMode(!!searchValue);
	}, [searchValue]);

	const onBackArrowClick = (): void => messagePagestore.setShowSearchHeader(false);

	return (
		<header className={styles.header}>
			{messagePagestore.showSearchHeader ? (
				<SearchBar
					onBackArrowClick={onBackArrowClick}
					placeholder="Search messages"
					value={searchValue}
					onValueChange={onChange}
					showSpinner={isSearching}
				/>
			) : (
				<HamburgerBar />
			)}
		</header>
	);
});
