import { createSlice } from '@reduxjs/toolkit';

interface storeState {
  isModalOpened: boolean;
  isErrors: boolean;
  errorsMessage: string;
}

const initialState: storeState = {
  isModalOpened: false,
  isErrors: false,
  errorsMessage: ''
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
    },

    setValidityAndErrors: (state, action) => {
      state.isErrors = action.payload.isErrors;
      state.errorsMessage = action.payload.errorMessage;
    }
  }
});

export const { openModal, closeModal, setValidityAndErrors } = modalSlice.actions;

export default modalSlice.reducer;
