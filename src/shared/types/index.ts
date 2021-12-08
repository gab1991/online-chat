export interface ICurrentUserProfile {
	avatarUrl: string | null;

	chats: IChat[];

	displayedName: string;

	email: string;

	id: number;

	username: string;
}

export interface IChat {
	createdAt: string;

	creatorId: number;

	id: number;

	title: string;

	type: ChatType;

	updatedAt: string;
}

export enum ChatType {
	'group' = 'group',
	'private' = 'private',
}

export interface IContact {
	avatarUrl: string | null;

	displayedName: string;

	id: number;

	username: string;
}

export interface IUser {
	email: string;

	id: number;

	name: string;
}
