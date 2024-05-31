//edit order data and push it instead of old

import { Dispatch } from '@reduxjs/toolkit';

import { OrderElementType } from '../../types/OrderElementType';

import { editOrder as edit } from '../../slices/ordersSlice';
import { closeModal } from '../../slices/modalSlice';

export const handleEditOrder = (dispatch: Dispatch, order: OrderElementType): void => {
  dispatch(edit(order));
  dispatch(closeModal());
};
