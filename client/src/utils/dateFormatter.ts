export default function dateFormatter(date: Date) {
  // formats date to DD/MM/YYYY

  const year = date.getFullYear();
  let month: string | number = date.getMonth() + 1;
  let day: string | number = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${day}/${month}/${year}`;
}
