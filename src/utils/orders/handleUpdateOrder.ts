//edit order data and push it instead of old

import { Dispatch } from '@reduxjs/toolkit';

import { OrderElementType } from '../../types/OrderElementType';

import { updateOrder } from '../../slices/ordersSlice';
import { closeModal } from '../../slices/modalSlice';

export const handleUpdateOrder = (dispatch: Dispatch, order: OrderElementType): void => {
  dispatch(updateOrder(order));
  dispatch(closeModal());
};
