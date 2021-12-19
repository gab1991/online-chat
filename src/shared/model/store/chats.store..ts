import { makeAutoObservable } from 'mobx';

import { IChat } from 'shared/types';

import { ChatApiService, chatApiService } from 'shared/api';

class ChatsStore {
	chats: IChat[] = [];

	constructor(private chatApiService: ChatApiService) {
		makeAutoObservable(this);
	}

	setChats(chats: IChat[]) {
		this.chats = chats;
	}

	async fetchChats() {
		const { data: chats } = await chatApiService.getChats();
		chats && this.setChats(chats);
	}
}

export const chatsStore = new ChatsStore(chatApiService);
