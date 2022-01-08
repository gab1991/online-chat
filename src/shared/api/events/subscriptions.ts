import { ClientEvents } from './types';
import { IMessage } from 'shared/types';

import { chatsStore, profileStore } from 'shared/model/store';

import { eventEmmiter } from './eventEmmiter.service';

// Subscriptions
eventEmmiter.instance.on('disconnect', () => {
	profileStore.setProfileConnectionStatus(false);
});

eventEmmiter.instance.on('connect', () => {
	profileStore.setProfileConnectionStatus(true);
});

eventEmmiter.instance.io.on('reconnect', () => {
	profileStore.setProfileConnectionStatus(true);
});

eventEmmiter.subscribeTo(ClientEvents.sendMessageToClient, (message: IMessage) => {
	const isNewChat = !chatsStore.chats.find((chat) => chat.id === message.chatId);

	if (isNewChat) {
		return chatsStore.fetchChats();
	}

	chatsStore.addMessage(message);
});
