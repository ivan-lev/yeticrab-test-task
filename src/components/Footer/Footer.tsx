import './Footer.scss';

// Gravity UI components
import { Link } from '@gravity-ui/uikit';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <span>Выполнил Иван Лев для </span>
      <Link view="normal" href="https://yeticrab.ru/">
        YetiCrab
      </Link>
    </footer>
  );
}
