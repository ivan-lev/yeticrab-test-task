import { createSlice } from '@reduxjs/toolkit';

interface modalState {
  isModalOpened: boolean;
  isErrors: boolean;
  errorMessage: string;
  isErrorShown: boolean;
  isButtonBlocked: boolean;
}

const initialState: modalState = {
  isModalOpened: false,
  isErrors: false,
  errorMessage: '',
  isErrorShown: false,
  isButtonBlocked: true
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
      state.isErrorShown = false;
      state.errorMessage = '';
      state.isButtonBlocked = true;
      state.isErrors = false;
    },

    setValidityAndErrors: (state, action) => {
      state.isErrors = action.payload.isErrors;
      state.errorMessage = action.payload.errorMessage;
    },

    setShowErrorInModal: (state, action) => {
      state.isErrorShown = action.payload;
    },

    setButtonBlockedStatus: (state, action) => {
      state.isButtonBlocked = action.payload;
    }
  }
});

export const {
  openModal,
  closeModal,
  setValidityAndErrors,
  setShowErrorInModal,
  setButtonBlockedStatus
} = modalSlice.actions;

export default modalSlice.reducer;
