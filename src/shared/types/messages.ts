export interface IMessage {
	chatId: number;

	createdAt: string;

	id: number;

	message: string;

	senderId: number;
}

export type ChatMessagesMap = Record<string, IMessage[]>;
