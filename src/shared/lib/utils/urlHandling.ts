import { SERVER_ADRESS } from 'Configs/sever.config';

export function makeAvatarUrlPath(url: string) {
	return `${SERVER_ADRESS}/avatars/${url}`;
}
