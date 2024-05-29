import { createSlice } from '@reduxjs/toolkit';

interface storeState {
  isModalOpened: boolean;
}

const initialState: storeState = {
  isModalOpened: false
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: state => {
      state.isModalOpened = true;
    },
    closeModal: state => {
      state.isModalOpened = false;
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
