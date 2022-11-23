export function formatDate(date) {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'ноября',
    'декабря',
  ];

  let splitDate = date.split('-');

  return `${splitDate[2]} ${months[Number(splitDate[1] - 1)]} ${splitDate[0]}`
}