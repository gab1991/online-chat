import { ICurrentUserProfile } from 'shared/types';

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
}

export const profileApiService = new ProfileApiService();
