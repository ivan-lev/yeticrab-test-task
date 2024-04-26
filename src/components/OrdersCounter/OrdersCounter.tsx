// Gravity UI components
import { Text } from '@gravity-ui/uikit';

export default function OrdersCounter({ amount }: { amount: number }): JSX.Element {
  return (
    <div>
      <Text color="secondary">Количество заявок: </Text>
      <Text color="brand">{amount}</Text>
    </div>
  );
}
