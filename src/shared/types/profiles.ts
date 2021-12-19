export interface IStrictProfile {
	avatarUrl: string | null;

	displayedName: string;

	id: number;
}

export interface ICurrentUserProfile {
	avatarUrl: string | null;

	displayedName: string;

	email: string;

	id: number;

	username: string;
}
