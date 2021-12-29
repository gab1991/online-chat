import { ILastSeenMsg } from 'shared/types/lastSeenMsg';

import { Api, TApiResponse } from './abstractApi';
import { ISetLastSeenMessageDto } from './dto';

export class LastSeenMsgApiService extends Api {
	async getLastSeenMsgs(): TApiResponse<ILastSeenMsg[]> {
		return this.executeReq({
			method: 'GET',
			url: `/api/lastSeenMessages`,
		});
	}

	async setLastSeenMsg(lastSeenDto: ISetLastSeenMessageDto): Promise<ILastSeenMsg> {
		const { data: lastSeenMsg } = await this.executeReq<ILastSeenMsg>({
			data: lastSeenDto,
			method: 'PUT',
			url: `/api/lastSeenMessages`,
		});

		return lastSeenMsg;
	}
}

export const lastSeenMsgApiService = new LastSeenMsgApiService();
