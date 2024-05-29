import { createSlice } from '@reduxjs/toolkit';

interface storeState {
  isUserAdmin: boolean;
}

const initialState: storeState = {
  isUserAdmin: false
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserMode: state => {
      state.isUserAdmin = false;
    },
    setAdminMode: state => {
      state.isUserAdmin = true;
    }
  }
});

export const { setAdminMode, setUserMode } = usersSlice.actions;

export default usersSlice.reducer;
