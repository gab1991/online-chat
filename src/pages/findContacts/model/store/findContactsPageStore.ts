import { makeAutoObservable } from 'mobx';

import { IProfile } from 'shared/types';

import { api, ProfileApiService } from 'shared/api';

class FindContactsPageStore {
	profiles: IProfile[] = [];

	constructor(private profileService: ProfileApiService) {
		makeAutoObservable(this);
	}

	setProfiles(profiles: IProfile[]): void {
		this.profiles = profiles;
	}

	async fetchProfiles(nameOrDispname: string): Promise<void> {
		const { data: profiles } = await api.profileApiService.getProfiles(nameOrDispname);
		profiles && this.setProfiles(profiles);
	}
}

export const findContactsPageStore = new FindContactsPageStore(api.profileApiService);
