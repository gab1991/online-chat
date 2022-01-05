/* eslint-disable @typescript-eslint/no-magic-numbers */
export function getHHMMtime(timeStr: string): string {
	const date = new Date(timeStr);
	const hours = date.getHours();
	const minutes = date.getMinutes();

	return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

export function formatForDateFloater(dateStr: string): string {
	const date = new Date(dateStr);
	const now = new Date();

	const yearMsg = date.getFullYear();
	const montMsg = date.getMonth();
	const dayMsg = date.getDate();
	const yearNow = now.getFullYear();
	const monthNow = now.getMonth();
	const dayNow = now.getDate();

	if (yearMsg === yearNow && montMsg === monthNow && dayMsg === dayNow) {
		return 'Today';
	} else if (yearMsg === yearNow && montMsg === monthNow && dayNow - dayMsg === 1) {
		return 'Yesterday';
	} else {
		return date.toLocaleString('en', {
			day: 'numeric',
			month: 'long',
		});
	}
}
