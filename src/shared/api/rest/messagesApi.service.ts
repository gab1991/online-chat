import { IMessage } from 'shared/types';

import { Api, TApiResponse } from './abstractApi';

export class MessagesApiService extends Api {
	async searchMessagesInProfileChats(searchStr: string): TApiResponse<IMessage[]> {
		return this.executeReq({
			method: 'GET',
			url: `/api/messages/searchMessagesInProfileChats?search=${searchStr}`,
		});
	}
}

export const messagesApiService = new MessagesApiService();
