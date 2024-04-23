import { Text } from '@gravity-ui/uikit';

export default function RecordsCounter({ amount }: { amount: number }): JSX.Element {
  return (
    <>
      <Text color="secondary">Количество заявок: </Text>
      <Text color="brand">{amount}</Text>
    </>
  );
}
