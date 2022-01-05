function getHoursMinutes(dateStr) {
	const date = new Date(dateStr);
	let hours = date.getHours();
	let minutes = date.getMinutes();
	hours = hours > 9 ? hours : `0${hours}`;
	minutes = minutes > 9 ? minutes : `0${minutes}`;
	return [hours, minutes];
}

export { formatPopUpScroll, getHoursMinutes };
