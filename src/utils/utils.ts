export function formatPrice(price: number): string {
  return Number(price).toFixed(2);
}

export function formatDate(date: string) {
  const newDate = new Date(date);
  return newDate.toLocaleString();
}

export function formatDateToBar(grossDate: string) {
  const date = new Date(grossDate);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const formatted = `${day}/${month}/${year}`;

  return formatted;
}

export function setSocialImage(url: string) {
  return document
    .querySelector('meta[property="og:image"]')
    ?.setAttribute("content", url);
}
