import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

import { IMessage } from 'shared/types';

import { ISendMessageEventDto } from './dto/events';
import { SERVER_ADRESS } from 'Configs/sever.config';
import { chatsStore } from 'shared/model/store';

import { ClientEvents, ServerEvents } from './eventTypes';

type TSocketOptions = Partial<ManagerOptions & SocketOptions>;

class EventEmmiter {
	private socket: Socket;

	constructor(serverUrl: string, opt?: TSocketOptions) {
		this.socket = io(serverUrl, opt);
	}

	sendMsg(sendMessageDto: ISendMessageEventDto) {
		this.socket.emit(ServerEvents.sendMessageToServer, sendMessageDto);
	}

	get instance() {
		return this.socket;
	}

	subscribeTo(clientEvent: ClientEvents, cb: (data: any) => void) {
		this.socket.on(clientEvent, cb);
	}
}

const settings: TSocketOptions = {
	reconnectionDelay: 1000,
};

export const eventEmmiter = new EventEmmiter(SERVER_ADRESS, settings);

eventEmmiter.subscribeTo(ClientEvents.sendMessageToClient, (message: IMessage) => {
	chatsStore.addMessage(message);
});
