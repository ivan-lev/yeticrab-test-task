import './Main.scss';

// Components
import Orders from '../Orders/Orders';

// Gravity UI components
import { Text } from '@gravity-ui/uikit';

export default function Main(): JSX.Element {
  return (
    <main className="content">
      <Text variant="header-1">Текущие заявки</Text>
      <Orders />
    </main>
  );
}
