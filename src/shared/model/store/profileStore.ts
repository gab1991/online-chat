import { autorun, makeAutoObservable } from 'mobx';

import { IChat } from '../../../types';

type ProfileStoreSetUpProps = Omit<ProfileStore, 'fillProfile'>;

class ProfileStore {
	id: number | null = null;

	displayedName = '';

	avatarUrl: string | null = null;

	username = '';

	email = '';

	chats: IChat[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	fillProfile(props: Partial<ProfileStoreSetUpProps>) {
		Object.keys(props).forEach((key) => {
			this[key] = props[key];
		});
	}
}

export const profileStore = new ProfileStore();

autorun(() => {
	console.log(profileStore.username);
});
