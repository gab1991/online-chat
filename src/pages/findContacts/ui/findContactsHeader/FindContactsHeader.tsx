import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useSearchProfiles } from 'pages/findContacts/model';
import { SearchBar } from 'shared/ui';

import styles from './FindContactsHeader.module.scss';

export const FindContactsHeader = observer(() => {
	const [inputValue, setInputValue] = useState('');

	useSearchProfiles(inputValue);

	const navigate = useNavigate();

	const onSearchBarBackArrowClick = (): void => navigate('/');

	return (
		<header className={styles.header}>
			<SearchBar
				onBackArrowClick={onSearchBarBackArrowClick}
				placeholder="Find contacts"
				value={inputValue}
				onValueChange={setInputValue}
			/>
		</header>
	);
});
