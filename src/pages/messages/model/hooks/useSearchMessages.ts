import { useState } from 'react';

import { api } from 'shared/api';
import { useDebounce } from 'shared/lib';
import { chatsStore } from 'shared/model/store';

interface IUseSearchMessages {
	isSearching: boolean;
	onChange: (value: string) => void;
	searchValue: string;
}

export function useSearchMessages(): IUseSearchMessages {
	const [searchValue, setSearchValue] = useState('');
	const [isSearching, setIsSearching] = useState(false);

	const search = async (searchStr: string): Promise<void> => {
		const { data: foundMessages } = await api.messagesApiService.searchMessagesInProfileChats(searchStr);
		setIsSearching(false);

		chatsStore.fillFoundMessages(foundMessages || []);
	};

	const debouncedSearch = useDebounce(search, 500);

	const onChange = (value: string): void => {
		setIsSearching(true);
		setSearchValue(value);
		debouncedSearch(value);
		chatsStore.fillFoundMessages([]);
	};

	return { isSearching, onChange, searchValue };
}
