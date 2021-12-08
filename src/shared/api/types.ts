import { AxiosError } from 'axios';

export const isAxiosError = (err: unknown): err is AxiosError => {
	return typeof err === 'object' && err !== null && 'isAxiosError' in err;
};
