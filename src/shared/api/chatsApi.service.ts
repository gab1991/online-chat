import { IChat } from 'shared/types';

import { IEnterChatDto } from './dto/chats/enterChat.dto';

import { Api, TApiResponse } from './abstractApi';

export class ChatApiService extends Api {
	async getChats(): TApiResponse<IChat[]> {
		return this.executeReq({
			method: 'GET',
			url: `/api/chats`,
		});
	}

	async enterChat(enterChatDto: IEnterChatDto): TApiResponse<IChat> {
		return this.executeReq<IChat>({
			data: enterChatDto,
			method: 'POST',
			url: `/api/chats/enterChat`,
		});
	}
}

export const chatApiService = new ChatApiService();
