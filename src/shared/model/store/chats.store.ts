import { makeAutoObservable } from 'mobx';

import { IChat, IMessage } from 'shared/types';

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

	getChatById(chatId: number) {
		return this.chats.find((chat) => chat.id == chatId);
	}

	addMessage(message: IMessage) {
		const chat = this.chats.find((chat) => chat.id === message.chatId);

		chat?.messages.push(message);
	}
}

export const chatsStore = new ChatsStore(chatApiService);
