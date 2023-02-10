/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    content: {
      channels: [],
      messages: [],
      currentChannelId: '',
    },
  },
  reducers: {
    addContent(state, action) {
      const content = action.payload;
      state.content = content;
    },
    addMessage(state, action) {
      const message = action.payload;
      state.content.messages.push(message);
    },
    setCurrentChannel(state, action) {
      const channelId = action.payload;
      state.content.currentChannelId = channelId;
    },
    addChannel(state, action) {
      const channel = action.payload;
      state.content.channels.push(channel);
      state.content.currentChannelId = channel.id;
    },
    deleteChannel(state, action) {
      const { id } = action.payload;
      const { channels } = state.content;
      const { messages } = state.content;
      const defaultChannel = state.content.channels[0];
      state.content.channels = channels.filter((channel) => channel.id !== id);
      state.content.messages = messages.filter(({ channelId }) => channelId !== id);
      state.content.currentChannelId = defaultChannel.id;
    },
    updateChannel(state, action) {
      const renamedChannel = action.payload;
      const { channels } = state.content;
      const updatedChannels = channels.map((channel) => (channel.id === renamedChannel.id
        ? renamedChannel
        : channel));

      state.content.channels = updatedChannels;
    },
  },
});

export const {
  addContent, addMessage, setCurrentChannel, addChannel, deleteChannel, updateChannel,
} = chatSlice.actions;
export default chatSlice.reducer;
