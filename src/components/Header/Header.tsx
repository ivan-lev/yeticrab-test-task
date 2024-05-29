import './Header.scss';

// Redux
import { RootState } from '../../slices';
import { useDispatch, useSelector } from 'react-redux';

// Gravity UI components
import { Button } from '@gravity-ui/uikit';
import { Person, PersonPlus } from '@gravity-ui/icons';

// Utils
import { handleSetUserMode } from '../../utils/user/handleSetUserMode';

// Variables
import { BUTTON_NAMES } from '../../variables/buttonNames';

export default function Header(): JSX.Element {
  const dispatch = useDispatch();
  const isUserAdmin = useSelector((state: RootState) => state.users.isUserAdmin);

  return (
    <header className="header">
      {isUserAdmin ? (
        <Button
          view="outlined-success"
          size="l"
          onClick={() => handleSetUserMode(dispatch, isUserAdmin)}
        >
          <span className="button-content">
            <Person />
            {BUTTON_NAMES.USER_MODE}
          </span>
        </Button>
      ) : (
        <Button
          view="outlined-action"
          size="l"
          onClick={() => handleSetUserMode(dispatch, isUserAdmin)}
        >
          <span className="button-content">
            <PersonPlus />
            {BUTTON_NAMES.ADMIN_MODE}
          </span>
        </Button>
      )}
    </header>
  );
}
