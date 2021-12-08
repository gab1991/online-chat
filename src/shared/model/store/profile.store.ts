import { makeAutoObservable } from 'mobx';

import { IChat, ICurrentUserProfile } from 'shared/types';

import { ProfileApiService, profileApiService } from 'shared/api';

class ProfileStore {
	id: number | null = null;

	displayedName = '';

	avatarUrl: string | null = null;

	username = '';

	email = '';

	chats: IChat[] = [];

	constructor(private profileService: ProfileApiService) {
		makeAutoObservable(this);
	}

	fillProfile(props: Partial<ICurrentUserProfile>) {
		Object.keys(props).forEach((key) => {
			this[key] = props[key];
		});
	}

	async fetchCurrentProfile() {
		const { data: curProfile } = await this.profileService.getCurrentUserProfile();

		if (curProfile) {
			this.fillProfile(curProfile);
		}
	}
}

export const profileStore = new ProfileStore(profileApiService);
