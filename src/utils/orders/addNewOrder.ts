// put new order in the end of the orders array

import { SetStateAction } from 'react';

import { OrderElementType as T } from '../../types/OrderElementType';

export const addNewOrder = (
  newOrder: T,
  orders: T[],
  setOrders: (value: SetStateAction<Array<T>>) => void,
  orderNumber: number,
  setOrderNumber: (value: SetStateAction<number>) => void
): void => {
  newOrder.number = orderNumber;
  const currentTime = new Date();
  newOrder.datetime = currentTime.toISOString();
  setOrderNumber(orderNumber + 1);
  const newOrders = [...orders, newOrder];
  setOrders(newOrders);
};
