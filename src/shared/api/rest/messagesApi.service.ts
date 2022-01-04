import { IMessage } from 'shared/types';

import { Api, TApiResponse } from './abstractApi';

export class MessagesApiService extends Api {
	async searchMessagesInProfileChats(searchStr: string, chatId?: number): TApiResponse<IMessage[]> {
		const params: Record<string, string> = { search: searchStr };

		if (chatId) {
			params.chatId = chatId.toString();
		}
		// eslint-disable-next-line compat/compat
		const ulrParams = new URLSearchParams(params);

		return this.executeReq({
			method: 'GET',
			url: `/api/messages/searchMessagesInProfileChats?${ulrParams.toString()}`,
		});
	}
}

export const messagesApiService = new MessagesApiService();
