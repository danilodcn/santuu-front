export function formatPrice(price: number): string {
  return Number(price).toFixed(2);
}

export function formatDate(date: string) {
  const newDate = new Date(date);
  return newDate.toLocaleString();
}

export function formatDateDetail(grossDate: string) {
  const date = new Date(grossDate);

  const minute = date.getMinutes().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const formatted = `${day}/${month}/${year} às ${hour}:${minute}`;

  return formatted;
}

export function setSocialProperties(
  url: string,
  title: string,
  description: string,
  image: string
) {
  document
    .querySelector('meta[property="og:url"]')
    ?.setAttribute("content", url);
  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", title);
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute("content", description);
  document
    .querySelector('meta[property="og:image"]')
    ?.setAttribute("content", image);
}
