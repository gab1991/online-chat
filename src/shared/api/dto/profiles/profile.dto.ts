import { IChat, ICurrentUserProfile } from 'shared/types';

export interface ICurrentProfileWithChatsDto extends ICurrentUserProfile {
	chats: IChat[];
}
