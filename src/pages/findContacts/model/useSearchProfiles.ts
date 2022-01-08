import { useEffect } from 'react';

import { useDebounce } from 'shared/lib';

import { findContactsPageStore } from './store';

export function useSearchProfiles(searchStr: string): void {
	const fetchProfilesDebounced = useDebounce(
		(searchStr: string) => findContactsPageStore.fetchProfiles(searchStr),
		500,
	);

	useEffect(() => {
		fetchProfilesDebounced(searchStr);
	}, [searchStr, fetchProfilesDebounced]);
}
