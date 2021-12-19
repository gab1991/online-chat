import { IStrictProfile } from './profiles';

export interface IChat {
	avatarUrl: string | null;

	createdAt: string;

	creatorId: number;

	id: number;

	participants: IStrictProfile[];

	title: string;

	type: ChatType;
}

export enum ChatType {
	'group' = 'group',
	'private' = 'private',
}
