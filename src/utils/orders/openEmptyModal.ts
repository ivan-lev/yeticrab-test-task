import { Dispatch } from '@reduxjs/toolkit';

import { setIsNewStatus } from '../../slices/ordersSlice';
import { openModal } from '../../slices/modalSlice';

export const openEmptyModal = (dispatch: Dispatch): void => {
  dispatch(setIsNewStatus(true));
  dispatch(openModal());
};
