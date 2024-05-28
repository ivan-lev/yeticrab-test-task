export function maskPhoneNumber(phone: string): string {
  let maskedPhone = phone;
  maskedPhone = maskedPhone.replace('+7', '');
  maskedPhone = maskedPhone.replace(/\D/gi, '');

  if (maskedPhone.length === 0 || (maskedPhone.length === 1 && maskedPhone !== '9')) {
    return `+7`;
  }

  if (maskedPhone.length <= 3) {
    return `+7(${maskedPhone.substring(0, 3)}`;
  }

  if (maskedPhone.length <= 6) {
    return `+7(${maskedPhone.substring(0, 3)})${maskedPhone.substring(3, 6)}`;
  }

  return `+7(${maskedPhone.substring(0, 3)})${maskedPhone.substring(3, 6)}-${maskedPhone.substring(
    6,
    10
  )}`;
}
