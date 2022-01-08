import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

import { ClientEvents, ServerEvents } from './types';

import { SERVER_ADRESS } from 'configs/sever.config';

import { IJoinChatsDto, ISendMessageEventDto, ISetIsOnlineDto } from './dto';

type TSocketOptions = Partial<ManagerOptions & SocketOptions>;

const settings: TSocketOptions = {
	reconnectionDelay: 1000,
	withCredentials: true,
};

class EventEmmiter {
	private socket: Socket;

	constructor(serverUrl: string, opt?: TSocketOptions) {
		this.socket = io(serverUrl, opt);
	}

	sendMsg(sendMessageDto: ISendMessageEventDto): void {
		this.socket.emit(ServerEvents.sendMessageToServer, sendMessageDto);
	}

	joinChats(joinChatsDto: IJoinChatsDto): void {
		this.socket.emit(ServerEvents.joinChats, joinChatsDto);
	}

	setIsOnline(setIsOnlineDto: ISetIsOnlineDto): void {
		this.socket.emit(ServerEvents.setIsOnline, setIsOnlineDto);
	}

	get instance(): Socket {
		return this.socket;
	}

	subscribeTo(clientEvent: ClientEvents, cb: (data: any) => void): void {
		this.socket.on(clientEvent, cb);
	}
}

export const eventEmmiter = new EventEmmiter(SERVER_ADRESS, settings);
