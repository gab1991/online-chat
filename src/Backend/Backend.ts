import axios_base, { AxiosPromise } from 'axios';
import { getToken } from '../store/store';
import { server_adress } from '../Configs/sever.config';
import { CurrentUserProfile, IChat } from '../types';

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
		const res = await axios(options);

		return res;
	} catch (err) {
		console.log('ERROR', err);

		if (typeof errCb === 'function') errCb(err);
		throw new Error();
	}
};

const Backend = {
	postSignUp: ({ username, password, email }, errCb) => {
		return axiosExecute(
			{
				url: `/api/users/sign_up`,
				method: 'POST',
				data: {
					username,
					password,
					email,
				},
			},
			errCb,
		);
	},

	postLogin: ({ username_email, password }, errCb) => {
		return axiosExecute(
			{
				url: `/api/auth/signin`,
				method: 'POST',
				data: {
					nameOrEmail: username_email,
					password: password,
				},
			},
			errCb,
		);
	},
	checkTokenValidity: (username, token, errCb) => {
		return axiosExecute(
			{
				url: `/api/users/checkTokenValidity`,
				method: 'POST',
				headers: {
					authorization: `Bearer ${token}`,
				},
				data: {
					username,
				},
			},
			errCb,
		);
	},

	uploadAvatar: (formData, errCb) => {
		return axiosExecute(
			{
				url: `/api/img_upload/avatar`,
				headers: {
					'content-type': 'multipart/form-data',
					authorization: `Bearer ${getToken()}`,
				},
				method: 'POST',
				data: formData,
			},
			errCb,
		);
	},
	getProfile: (errCb?: any): Promise<AxiosPromise<CurrentUserProfile>> => {
		return axiosExecute(
			{
				url: `/api/profiles`,
				method: 'GET',
			},
			errCb,
		);
	},
	findProfiles: (searchStr, errCb) => {
		return axiosExecute(
			{
				url: `/api/profiles?name=${searchStr}`,
				method: 'GET',
			},
			errCb,
		);
	},
	conversationEnter: (contactName, errCb): Promise<AxiosPromise<IChat>> => {
		return axiosExecute(
			{
				url: `/api/chats/enterChat`,
				method: 'POST',
				data: {
					participantId: contactName,
				},
			},
			errCb,
		);
	},

	uploadNewConv: (user_id, chatID, errCb) => {
		return axiosExecute(
			{
				url: `/api/conversation/uploadNewConv/${user_id}/${chatID}`,
				method: 'GET',
				headers: {
					authorization: `Bearer ${getToken()}`,
				},
			},
			errCb,
		);
	},

	updateDispName: (dispName, errCb) => {
		return axiosExecute(
			{
				url: `/api/profiles/updateDispName`,
				method: 'POST',
				headers: {
					authorization: `Bearer ${getToken()}`,
				},
				data: {
					token: getToken(),
					dispName: dispName,
				},
			},
			errCb,
		);
	},

	//New methods
	fetchCurrentUserProfile: () => {
		return axiosExecute({
			url: 'api/profiles/mine',
			method: 'GET',
		});
	},
};

export default Backend;
