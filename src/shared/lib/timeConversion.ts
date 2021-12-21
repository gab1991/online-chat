export function getHHMMtime() {
	const date = new Date();

	return `${date.getHours()}:${date.getMinutes()}`;
}
