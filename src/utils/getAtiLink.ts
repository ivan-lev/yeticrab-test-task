export function getAtiLink(code?: number): string {
  return code === undefined ? `https://ati.su/firms/${code}/info` : '';
}
