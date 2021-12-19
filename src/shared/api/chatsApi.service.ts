import { IChat } from 'shared/types';

import { Api, TApiResponse } from './api';

export class ChatApiService extends Api {
	async getChats(): TApiResponse<IChat[]> {
		return this.executeReq({
			method: 'GET',
			url: `/api/chats`,
		});
	}
}

export const chatApiService = new ChatApiService();
