import { StatusCodes } from 'http-status-codes';

import { isAxiosError } from './types';
import { IUser } from 'types';

import { Api, TApiResponse } from './api';

class AuthApiService extends Api {
	async login(nameOrEmail: string, password: string): TApiResponse<IUser> {
		try {
			const { data } = await this.executeReq<IUser>({
				data: {
					nameOrEmail,
					password,
				},
				method: 'POST',
				url: `/api/auth/signin`,
			});

			return { data };
		} catch (err) {
			if (isAxiosError(err) && err.response?.status === StatusCodes.UNAUTHORIZED) {
				return { data: null, error: 'your credentials are not valid' };
			}
			return { data: null, error: 'something went wrong try again later' };
		}
	}
}

export const authApiService = new AuthApiService();
