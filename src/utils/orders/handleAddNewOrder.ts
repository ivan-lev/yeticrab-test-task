// put new order in the end of the orders array

import { Dispatch } from '@reduxjs/toolkit';

import { OrderElementType } from '../../types/OrderElementType';

import { addOrder } from '../../slices/ordersSlice';
import { closeModal } from '../../slices/modalSlice';
import { setShowErrorInModal } from '../../slices/modalSlice';

export const handleAddNewOrder = (dispatch: Dispatch, order: OrderElementType): void => {
  dispatch(addOrder(order));
  dispatch(closeModal());
  dispatch(setShowErrorInModal(false));
};
