const months = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sept',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec'
}

export const isSameDay = (a, b) => {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit' });
}

export const formatDateTime = (date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const now = new Date();

  let formattedDate = `${day} ${months[month]}`;

  formattedDate += now.getFullYear() !== date.getFullYear()
    ? ` ${year}`
    : (isSameDay(date, now) ? `, ${formatTime(date)}` : '');


  return formattedDate;
}
