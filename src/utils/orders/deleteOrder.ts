import { Dispatch, SetStateAction } from 'react';

import { TableDataItem } from '@gravity-ui/uikit';
import { OrderElementType } from '../../types/OrderElementType';

export function deleteOrder(
  item: TableDataItem,
  orders: OrderElementType[],
  setOrders: Dispatch<SetStateAction<OrderElementType[]>>
) {
  const newOrders = orders.filter(order => order.number !== item.id);
  setOrders(newOrders);
}
