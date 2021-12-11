import { makeAutoObservable } from 'mobx';

import { IChat } from 'shared/types';

import { ProfileApiService, profileApiService } from 'shared/api';

interface IProfile {
	avatarUrl: string | null;
	chats: IChat[];
	displayedName: string;
	email: string;
	id: number | null;
	username: string;
}

const profileInitialState: IProfile = {
	avatarUrl: null,
	chats: [],
	displayedName: '',
	email: '',
	id: null,
	username: '',
};
class ProfileStore {
	profile: IProfile = profileInitialState;

	constructor(private profileService: ProfileApiService) {
		makeAutoObservable(this);
	}

	fillProfile(updProfile: Partial<IProfile>) {
		this.profile = { ...this.profile, ...updProfile };
	}

	clearProfile() {
		this.profile = profileInitialState;
	}

	async fetchCurrentProfile() {
		const { data: curProfile } = await this.profileService.getCurrentUserProfile();

		if (curProfile) {
			this.fillProfile(curProfile);
		}
	}
}

export const profileStore = new ProfileStore(profileApiService);
