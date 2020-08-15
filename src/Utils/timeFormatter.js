function getHoursMinutes(dateStr) {
  const date = new Date(dateStr);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = hours > 9 ? hours : `0${hours}`;
  minutes = minutes > 9 ? minutes : `0${minutes}`;
  return [hours, minutes];
}

function formatPopUpScroll(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();

  const yearMsg = date.getYear();
  const montMsg = date.getMonth();
  const dayMsg = date.getDate();
  const yearNow = now.getYear();
  const monthNow = now.getMonth();
  const dayNow = now.getDate();

  if (yearMsg === yearNow && montMsg === monthNow && dayMsg === dayNow) {
    return 'Today';
  } else if (
    yearMsg === yearNow &&
    montMsg === monthNow &&
    dayNow - dayMsg === 1
  ) {
    return 'Yesterday';
  } else {
    return date.toLocaleString('en', {
      month: 'long',
      day: 'numeric',
    });
  }
}

export { getHoursMinutes, formatPopUpScroll };
