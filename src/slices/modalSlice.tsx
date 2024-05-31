import { createSlice } from '@reduxjs/toolkit';

interface modalState {
  isModalOpened: boolean;
  isDataEdited: boolean;
  isErrors: boolean;
  isErrorShown: boolean;
  errorMessage: string;
  isButtonBlocked: boolean;
}

const initialState: modalState = {
  isModalOpened: false,
  isDataEdited: false,
  isErrors: false,
  isErrorShown: false,
  errorMessage: '',
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
      state.isDataEdited = false;
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
    },

    setIsDataEdited: (state, action) => {
      state.isDataEdited = action.payload;
    }
  }
});

export const {
  openModal,
  closeModal,
  setValidityAndErrors,
  setShowErrorInModal,
  setButtonBlockedStatus,
  setIsDataEdited
} = modalSlice.actions;

export default modalSlice.reducer;
