import axios_base, { AxiosPromise } from 'axios';

import { IChat, ICurrentUserProfile } from 'shared/types';

import { server_adress } from '../Configs/sever.config';
import { getToken } from '../shared/model/store/store';

export const makeAvatarUrlPath = (url: string) => {
	return `${server_adress}/avatars/${url}`;
};

const axios = axios_base.create({
	baseURL: server_adress,
	timeout: 4000,
	withCredentials: true,
});

const axiosExecute = async (options = {}, errCb?: any): Promise<AxiosPromise<any>> => {
	try {
		return await axios(options);
	} catch (err) {
		console.log('ERROR', err);

		if (typeof errCb === 'function') errCb(err);
		throw new Error();
	}
};

const Backend = {
	checkTokenValidity: (username, token, errCb) => {
		return axiosExecute(
			{
				data: {
					username,
				},
				headers: {
					authorization: `Bearer ${token}`,
				},
				method: 'POST',
				url: `/api/users/checkTokenValidity`,
			},
			errCb,
		);
	},

	conversationEnter: (contactName, errCb): Promise<AxiosPromise<IChat>> => {
		return axiosExecute(
			{
				data: {
					participantId: contactName,
				},
				method: 'POST',
				url: `/api/chats/enterChat`,
			},
			errCb,
		);
	},
	//New methods
	fetchCurrentUserProfile: () => {
		return axiosExecute({
			method: 'GET',
			url: 'api/profiles/mine',
		});
	},

	findProfiles: (searchStr, errCb) => {
		return axiosExecute(
			{
				method: 'GET',
				url: `/api/profiles?name=${searchStr}`,
			},
			errCb,
		);
	},

	getProfile: (errCb?: any): Promise<AxiosPromise<ICurrentUserProfile>> => {
		return axiosExecute(
			{
				method: 'GET',
				url: `/api/profiles`,
			},
			errCb,
		);
	},

	postLogin: ({ username_email, password }, errCb) => {
		return axiosExecute(
			{
				data: {
					nameOrEmail: username_email,
					password: password,
				},
				method: 'POST',
				url: `/api/auth/signin`,
			},
			errCb,
		);
	},

	postSignUp: ({ username, password, email }, errCb) => {
		return axiosExecute(
			{
				data: {
					email,
					password,
					username,
				},
				method: 'POST',
				url: `/api/users/sign_up`,
			},
			errCb,
		);
	},

	updateDispName: (dispName, errCb) => {
		return axiosExecute(
			{
				data: {
					dispName: dispName,
					token: getToken(),
				},
				headers: {
					authorization: `Bearer ${getToken()}`,
				},
				method: 'POST',
				url: `/api/profiles/updateDispName`,
			},
			errCb,
		);
	},

	uploadAvatar: (formData, errCb) => {
		return axiosExecute(
			{
				data: formData,
				headers: {
					authorization: `Bearer ${getToken()}`,
					'content-type': 'multipart/form-data',
				},
				method: 'POST',
				url: `/api/img_upload/avatar`,
			},
			errCb,
		);
	},

	uploadNewConv: (user_id, chatID, errCb) => {
		return axiosExecute(
			{
				headers: {
					authorization: `Bearer ${getToken()}`,
				},
				method: 'GET',
				url: `/api/conversation/uploadNewConv/${user_id}/${chatID}`,
			},
			errCb,
		);
	},
};

export default Backend;
