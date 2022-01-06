import { SERVER_ADRESS } from 'configs/sever.config';

export function makeAvatarUrlPath(url: string): string {
	return `${SERVER_ADRESS}/avatars/${url}`;
}
