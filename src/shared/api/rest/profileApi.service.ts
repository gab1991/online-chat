import { ICurrentUserProfile, IProfile } from 'shared/types';

import { IUpdDispNameDto } from './dto/profiles/updDispName.dto';

import { Api, TApiResponse } from './abstractApi';

export class ProfileApiService extends Api {
	async getCurrentUserProfile(): TApiResponse<ICurrentUserProfile> {
		try {
			const { data } = await this.executeReq<ICurrentUserProfile>({
				method: 'GET',
				url: `api/profiles/mine`,
			});

			return { data };
		} catch (err) {
			return { data: null, error: 'something went wrong try again later' };
		}
	}

	async getProfiles(name: string): TApiResponse<IProfile[]> {
		try {
			const { data } = await this.executeReq<IProfile[]>({
				method: 'GET',
				url: `api/profiles?name=${name}`,
			});

			return { data };
		} catch (err) {
			return { data: null, error: 'something went wrong try again later' };
		}
	}

	async updateDisplayedName(id: number, newDispName: string): TApiResponse<ICurrentUserProfile> {
		try {
			const { data } = await this.executeReq<ICurrentUserProfile, IUpdDispNameDto>({
				data: { displayedName: newDispName },
				method: 'PATCH',
				url: `api/profiles/${id}/updateDispName`,
			});

			return { data };
		} catch (err) {
			return { data: null, error: 'something went wrong try again later' };
		}
	}

	async uploadAvatar(fileContainigForm: FormData, id: number): TApiResponse<ICurrentUserProfile> {
		try {
			const { data } = await this.executeReq<ICurrentUserProfile, FormData>({
				data: fileContainigForm,
				method: 'POST',
				url: `api/profiles/${id}/uploadAvatar`,
			});

			return { data };
		} catch (err) {
			return { data: null, error: 'something went wrong try again later' };
		}
	}
}

export const profileApiService = new ProfileApiService();
