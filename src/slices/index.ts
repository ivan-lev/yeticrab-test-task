import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './usersSlice';
import ordersReducer from './ordersSlice';
import modalReducer from './modalSlice.tsx';

const store = configureStore({
  reducer: {
    users: usersReducer,
    orders: ordersReducer,
    modal: modalReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
