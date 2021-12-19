import { IStrictProfile } from './profiles';

import { IMessage } from '.';

export interface IChat {
	avatarUrl: string | null;

	createdAt: string;

	creatorId: number;

	id: number;

	messages: IMessage[];

	participants: IStrictProfile[];

	title: string;

	type: ChatType;
}

export enum ChatType {
	'group' = 'group',
	'private' = 'private',
}
