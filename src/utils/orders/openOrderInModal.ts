import { Dispatch } from '@reduxjs/toolkit';
import { TableDataItem } from '@gravity-ui/uikit';

import { setIsNewStatus, setOpenedOrder } from '../../slices/ordersSlice';
import { openModal } from '../../slices/modalSlice';

import { OrderElementType } from '../../types/OrderElementType';

export const openOrderInModal = (
  dispatch: Dispatch,
  orders: OrderElementType[],
  item: TableDataItem
): void => {
  dispatch(setIsNewStatus(false));
  const currentOrder = orders.find(order => order.number === item.id);
  dispatch(setOpenedOrder(currentOrder));
  dispatch(openModal());
};
