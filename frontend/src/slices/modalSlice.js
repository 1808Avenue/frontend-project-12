/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
    data: {},
  },
  reducers: {
    showModal(state, action) {
      const modalType = action.payload?.type;
      const modalData = action.payload?.data;

      state.isOpened = true;
      state.type = modalType;
      state.data = modalData;
    },
    hideModal(state) {
      state.isOpened = false;
      state.type = null;
      state.data = {};
    },
  },
});

export const selectModalState = (state) => state.modal;

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
