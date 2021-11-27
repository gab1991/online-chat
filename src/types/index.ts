export interface CurrentUserProfile {
	id: number;

	displayedName: string;

	avatarUrl: string | null;

	username: string;

	email: string;

	chats: any[];
}

export interface IContact {
	id: number;

	displayedName: string;

	avatarUrl: string | null;

	username: string;
}
