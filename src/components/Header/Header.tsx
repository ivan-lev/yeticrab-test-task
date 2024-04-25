import './Header.scss';

// React components
import { Dispatch, SetStateAction } from 'react';

// Gravity UI components
import { Button } from '@gravity-ui/uikit';
import { Person, PersonPlus } from '@gravity-ui/icons';

// Variables
import { BUTTON_NAMES } from '../../variables/buttonNames';

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
        <Button view="outlined-success" size="l" onClick={changeAdminMode}>
          <span className="button-content">
            <Person />
            {BUTTON_NAMES.USER_MODE}
          </span>
        </Button>
      ) : (
        <Button view="outlined-action" size="l" onClick={changeAdminMode}>
          <span className="button-content">
            <PersonPlus />
            {BUTTON_NAMES.ADMIN_MODE}
          </span>
        </Button>
      )}
    </header>
  );
}
