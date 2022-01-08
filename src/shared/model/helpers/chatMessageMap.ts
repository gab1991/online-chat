import { ChatMessagesMap, IMessage } from 'shared/types';

export function createChatMessageMap(messages: IMessage[]): ChatMessagesMap {
	const chatsFoundMessageMap: ChatMessagesMap = {};

	messages.forEach((message) => {
		const existingMessagesInMap = chatsFoundMessageMap[message.chatId];

		chatsFoundMessageMap[message.chatId] = existingMessagesInMap ? [...existingMessagesInMap, message] : [message];
	});

	return chatsFoundMessageMap;
}
