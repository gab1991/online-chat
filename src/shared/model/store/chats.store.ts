import { makeAutoObservable } from 'mobx';

import { IChat, IMessage } from 'shared/types';
import { ILastSeenMsg } from 'shared/types/lastSeenMsg';

import { api, ChatApiService, LastSeenMsgApiService } from 'shared/api';

class ChatsStore1 {
	chats: IChat[] = [];
	lastSeenMsgs: ILastSeenMsg[] = [];

	constructor(private chatApiService: ChatApiService, private lastSeenMsgService: LastSeenMsgApiService) {
		makeAutoObservable(this);
	}

	setChats(chats: IChat[]): void {
		this.chats = chats;
	}

	async fetchChats(): Promise<void> {
		const { data: chats } = await this.chatApiService.getChats();
		chats && this.setChats(chats);
	}

	async fetchLastSeenMsgs(): Promise<void> {
		const { data: lastSeenMsgs } = await this.lastSeenMsgService.getLastSeenMsgs();
		this.setLastSeenMsgs(lastSeenMsgs || []);
	}

	async updLastSeenMsg(chatId: number, msgId: number): Promise<void> {
		const lastSeenMsg = await this.lastSeenMsgService.setLastSeenMsg({ chatId, msgId });
		this.replaceLastSeeninChat(lastSeenMsg);
	}

	replaceLastSeeninChat(message: ILastSeenMsg): void {
		this.lastSeenMsgs = this.lastSeenMsgs.filter((msg) => msg.chatId !== message.chatId);
		this.lastSeenMsgs.push(message);
	}

	getChatById(chatId: number): IChat | undefined {
		return this.chats.find((chat) => chat.id == chatId);
	}

	addMessage(message: IMessage): void {
		const chat = this.chats.find((chat) => chat.id === message.chatId);

		chat?.messages.push(message);
	}

	setLastSeenMsgs(lastSeenMsgs: ILastSeenMsg[]): void {
		this.lastSeenMsgs = lastSeenMsgs;
	}

	getUnseenMsgCount(chatId: number): number {
		const lastSeenChatMsgs = this.lastSeenMsgs.find((lastSeenMsg) => lastSeenMsg.chatId === chatId);

		if (!lastSeenChatMsgs) {
			return 0;
		}

		const searchedChat = this.chats.find((chat) => chat.id == chatId);

		if (!searchedChat) {
			return 0;
		}

		const searchedMsgIndex = searchedChat.messages.findIndex((msg) => msg.id === lastSeenChatMsgs.msgId);

		if (searchedMsgIndex < 0) {
			return 0;
		}

		return searchedChat.messages.length - searchedMsgIndex - 1;
	}

	getLastSeenMsgIdInChat(chatId: number): number | null {
		const lastSeenChatMsgs = this.lastSeenMsgs.find((lastSeenMsg) => lastSeenMsg.chatId === chatId);
		return lastSeenChatMsgs?.msgId || null;
	}
}

export const chatsStore = new ChatsStore1(api.chatApiService, api.lastSeenMsgApiService);
