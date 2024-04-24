import './Footer.scss';

import { Link } from '@gravity-ui/uikit';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      Выполнил Иван Лев для{' '}
      <Link view="normal" href="https://yeticrab.ru/">
        YetiCrab
      </Link>
    </footer>
  );
}
