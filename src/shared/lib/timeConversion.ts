/* eslint-disable @typescript-eslint/no-magic-numbers */
export function getHHMMtime(timeStr: string) {
	const date = new Date(timeStr);
	const hours = date.getHours();
	const minutes = date.getMinutes();

	return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}
