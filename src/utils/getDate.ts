export function getDate(date: string): string {
  const orderDate = new Date(date);
  return `${orderDate.getFullYear()}-${orderDate.getMonth()}-${orderDate.getDate()} ${orderDate.getHours()}:${orderDate.getMinutes()}:${orderDate.getSeconds()}`;
}
