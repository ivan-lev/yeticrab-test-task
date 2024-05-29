// this function is checking inputs via validators,
// set the error message
// and return boolean error status

import type { OrderElementType } from '../types/OrderElementType';

import { validators } from './validator';

export const checkValidity = (
  openedOrder: OrderElementType
): { isErrors: boolean; errorMessage: string } => {
  const { clientsFirm, shipperName, shipperPhone, atiCode } = openedOrder;
  const errorsArray = [];
  errorsArray.push(validators.clientsFirmValidator(clientsFirm || ''));
  errorsArray.push(validators.shipperNameValidator(shipperName || ''));
  errorsArray.push(validators.shipperPhoneValidator(shipperPhone || ''));
  errorsArray.push(validators.atiCodeValidator(atiCode));

  let errorMessagesArray: string[] = [];
  errorsArray.forEach(error => {
    if (error.errorMessage.length !== 0) {
      errorMessagesArray.push(error.errorMessage);
    }
  });

  const errorMessage = errorMessagesArray.join(', ');

  const isErrors: boolean = errorsArray.some(error => error.isValid === false);
  //   const allInputsValid: boolean = errorsArray.every(error => error.isValid === true);
  return { isErrors, errorMessage };
};
