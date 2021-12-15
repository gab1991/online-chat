import { Api, TApiResponse } from './api';

class ChatApiService extends Api {
	async getPrivateChatDetailed(chatId: number): TApiResponse<any> {
		return this.executeReq({
			method: 'GET',
			url: `/api/chats/${chatId}`,
		});
	}
}

export const chatApiService = new ChatApiService();
