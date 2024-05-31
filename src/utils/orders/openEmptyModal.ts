import { Dispatch } from '@reduxjs/toolkit';

import { setEmptyOrder, setIsNewStatus } from '../../slices/ordersSlice';
import { openModal } from '../../slices/modalSlice';

export const openEmptyModal = (dispatch: Dispatch): void => {
  dispatch(setEmptyOrder());
  dispatch(setIsNewStatus(true));
  dispatch(openModal());
};
