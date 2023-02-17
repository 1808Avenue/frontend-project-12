/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { deleteChannel, fetchContent, selectCurrentChannelId } from './channelsSlice';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(state, action) {
      const message = action.payload;

      state.messages = [...state.messages, message];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.fulfilled, (state, action) => {
        const content = action.payload;

        state.messages = content.messages;
      })
      .addCase(deleteChannel, (state, action) => {
        const { id } = action.payload;
        const { messages } = state;

        state.messages = messages.filter(({ channelId }) => channelId !== id);
      });
  },
});

export const selectMessages = (state) => state.messages.messages;
export const selectLastMessage = createSelector(
  [selectMessages],
  (messages) => messages[messages.length - 1],
);
export const selectCurrentChannelMessages = createSelector(
  [selectMessages, selectCurrentChannelId],
  (messages, id) => messages.filter(({ channelId }) => channelId === id),
);

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
