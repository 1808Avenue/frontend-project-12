/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchContent = createAsyncThunk(
  'channels/fetchContent',
  async (getAuthHeader) => {
    const { data } = await axios.get(routes.contentPath(), { headers: getAuthHeader() });
    return data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: '',
    loadingStatus: 'idle',
    error: null,
  },
  reducers: {
    setCurrentChannel(state, action) {
      const channelId = action.payload;
      state.currentChannelId = channelId;
    },
    addChannel(state, action) {
      const channel = action.payload;

      state.channels.push(channel);
      state.currentChannelId = channel.id;
    },
    deleteChannel(state, action) {
      const { id } = action.payload;
      const { channels } = state;
      const defaultChannel = state.channels[0];

      state.channels = channels.filter((channel) => channel.id !== id);
      state.currentChannelId = defaultChannel.id;
    },
    updateChannel(state, action) {
      const renamedChannel = action.payload;
      const { channels } = state;
      const updatedChannels = channels.map((channel) => (channel.id === renamedChannel.id
        ? renamedChannel
        : channel));

      state.channels = updatedChannels;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        const content = action.payload;

        state.loadingStatus = 'idle';
        state.channels = content.channels;
        state.currentChannelId = content.currentChannelId;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const selectChannels = (state) => state.channels.channels;
export const selectCurrentChannelId = (state) => state.channels.currentChannelId;
export const selectCurrentChannel = createSelector(
  [selectChannels, selectCurrentChannelId],
  (channels, currentChannelId) => channels.filter(({ id }) => id === currentChannelId),
);
export const selectChannelNames = createSelector(
  selectChannels,
  (channels) => channels.map(({ name }) => name),
);
export const selectLoadingStatus = (state) => state.channels.loadingStatus;

export const {
  setCurrentChannel, addChannel, deleteChannel, updateChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
