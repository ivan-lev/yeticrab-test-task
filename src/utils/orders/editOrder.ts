//edit order data and push it instead of old

import { SetStateAction } from 'react';

import { OrderElementType as T } from '../../types/OrderElementType';

export function editOrder(
  newOrder: T,
  orders: T[],
  setOrders: (value: SetStateAction<Array<T>>) => void
): void {
  let newOrders: T[] = [];

  orders.forEach(order => {
    if (order.number !== newOrder.number) {
      newOrders.push(order);
    }
    if (order.number === newOrder.number) {
      newOrders.push(newOrder);
    }
  });
  setOrders(newOrders);
}
