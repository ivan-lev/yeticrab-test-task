import { NAME_REGEXP, PHONE_REGEXP, ATI_REGEXP } from '../variables/variables';
import { VALIDATION_ERRORS } from '../variables/messages';

function clientsFirmValidator(name: string): { isValid: boolean; errorMessage: string } {
  if (!name) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.CLIENTS_FIRM_EMPTY };
  }

  if (name.length < 6) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.CLIENTS_FIRM_SHORT };
  }

  return { isValid: true, errorMessage: '' };
}

function shipperNameValidator(name: string): { isValid: boolean; errorMessage: string } {
  if (!name) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.NAME_EMPTY };
  }

  if (!name.match(NAME_REGEXP)) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.NAME_INVALID };
  }

  if (name.length < 2) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.NAME_SHORT };
  }

  if (name.length > 30) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.NAME_LONG };
  }

  return { isValid: true, errorMessage: '' };
}

function shipperPhoneValidator(phone: string): { isValid: boolean; errorMessage: string } {
  if (!phone.match(PHONE_REGEXP)) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.PHONE_INVALID };
  }
  return { isValid: true, errorMessage: '' };
}

function atiCodeValidator(atiCode: number | undefined): { isValid: boolean; errorMessage: string } {
  if (atiCode === undefined) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.ATI_INVALID };
  }

  const atiString: string = atiCode.toString();

  if (atiString.length !== 5 || !atiString.match(ATI_REGEXP)) {
    return { isValid: false, errorMessage: VALIDATION_ERRORS.ATI_INVALID };
  }

  return { isValid: true, errorMessage: '' };
}

export const validators = {
  clientsFirmValidator,
  shipperNameValidator,
  shipperPhoneValidator,
  atiCodeValidator
};
