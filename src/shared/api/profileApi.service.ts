import { ICurrentUserProfile } from 'shared/types';

import { IUpdDispNameDto } from './dto/updDispName.dto';

import { Api, TApiResponse } from './api';

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
}

export const profileApiService = new ProfileApiService();
