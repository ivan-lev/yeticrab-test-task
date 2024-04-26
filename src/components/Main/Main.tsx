import './Main.scss';

// React components
import { Dispatch, SetStateAction } from 'react';

// Components
import Orders from '../Orders/Orders';

// Gravity UI components
import { Text } from '@gravity-ui/uikit';

// Types, interfaces
import { OrderElementType } from '../../types/OrderElementType';

export default function Main({
  orders,
  setOrders,
  isAdminMode,
  latestOrderNumber,
  setLatestOrderNumber
}: {
  orders: OrderElementType[];
  setOrders: Dispatch<SetStateAction<OrderElementType[]>>;
  isAdminMode: boolean;
  latestOrderNumber: number;
  setLatestOrderNumber: Dispatch<SetStateAction<number>>;
}): JSX.Element {
  return (
    <main className="content">
      <Text variant="header-1">Текущие заявки</Text>
      <Orders
        orders={orders}
        setOrders={setOrders}
        isAdminMode={isAdminMode}
        latestOrderNumber={latestOrderNumber}
        setLatestOrderNumber={setLatestOrderNumber}
      />
    </main>
  );
}
