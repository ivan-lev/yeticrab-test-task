import './Header.scss';

// React components
import { Dispatch, SetStateAction } from 'react';

// Gravity UI components
import { Button } from '@gravity-ui/uikit';

export default function Header({
  isAdminMode,
  setIsAdminMode
}: {
  isAdminMode: boolean;
  setIsAdminMode: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const changeAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };
  return (
    <header className="header">
      {isAdminMode ? (
        <Button
          className="header__button"
          view="outlined-success"
          size="l"
          onClick={changeAdminMode}
        >
          Перейти в режим просмотра
        </Button>
      ) : (
        <Button
          className="header__button"
          view="outlined-action"
          size="l"
          onClick={changeAdminMode}
        >
          Перейти в режим администратора
        </Button>
      )}
    </header>
  );
}
