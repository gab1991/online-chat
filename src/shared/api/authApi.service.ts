import { StatusCodes } from 'http-status-codes';

import { isAxiosError } from './types';
import { ICurrentUserProfile } from 'shared/types';

import { ILoginDto } from './dto/login.dto';
import { ISignUpDto } from './dto/signUp.dto';

import { Api, TApiResponse } from './api';

class AuthApiService extends Api {
	async login(loginDto: ILoginDto): TApiResponse<ICurrentUserProfile> {
		try {
			const { data } = await this.executeReq<ICurrentUserProfile>({
				data: loginDto,
				method: 'POST',
				url: `/api/auth/signin`,
			});

			return { data };
		} catch (err) {
			if (isAxiosError(err) && err.response?.status === StatusCodes.UNAUTHORIZED) {
				return { data: null, error: err.response.data.message };
			}
			return { data: null, error: 'something went wrong try again later' };
		}
	}

	async signup(signupDto: ISignUpDto): TApiResponse<ICurrentUserProfile> {
		try {
			const { data } = await this.executeReq<ICurrentUserProfile>({
				data: signupDto,
				method: 'POST',
				url: `/api/auth/signup`,
			});

			return { data };
		} catch (err) {
			if (isAxiosError(err) && err.response?.status === StatusCodes.CONFLICT) {
				return { data: null, error: err.response.data.message };
			}
			return { data: null, error: 'something went wrong try again later' };
		}
	}

	async logout(): TApiResponse<void> {
		try {
			const { data } = await this.executeReq<void>({
				method: 'GET',
				url: `/api/auth/logout`,
			});

			return { data };
		} catch (err) {
			return { data: null, error: 'something went wrong try again later' };
		}
	}
}

export const authApiService = new AuthApiService();
