export interface CurrentUserProfile {
	id: number;

	displayedName: string;

	avatarUrl: string | null;

	username: string;

	email: string;

	chats: IChat[];
}

export interface IChat {
	id: number;

	title: string;

	type: ChatType;

	creatorId: number;

	createdAt: string;

	updatedAt: string;
}

export enum ChatType {
	'private' = 'private',
	'group' = 'group',
}

export interface IContact {
	id: number;

	displayedName: string;

	avatarUrl: string | null;

	username: string;
}

export interface IUser {
	id: number;

	name: string;

	email: string;
}
