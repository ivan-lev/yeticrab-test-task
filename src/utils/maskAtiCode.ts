export function maskAtiCode(code: string): string {
  let maskedCode = code;
  maskedCode = maskedCode.replace(/\D/gi, '');

  return maskedCode.substring(0, 5);
}
