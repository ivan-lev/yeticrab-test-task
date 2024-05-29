import { Dispatch } from '@reduxjs/toolkit';
import { setAdminMode, setUserMode } from '../../slices/usersSlice';

export function handleSetUserMode(dispatch: Dispatch, adminState: boolean) {
  if (!adminState) {
    dispatch(setAdminMode());
  } else {
    dispatch(setUserMode());
  }
}
