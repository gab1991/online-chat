export interface ISendMessageEventDto {
	chatId: number;
	message: string;
	senderId: number;
}

export interface IJoinChatsDto {
	chatIds: number[];
	profileId: number;
}
