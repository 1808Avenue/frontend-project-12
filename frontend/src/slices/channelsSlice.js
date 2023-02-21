/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const loadingProcess = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  FAILING: 'FAILING',
};

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
    loadingStatus: loadingProcess.IDLE,
    error: null,
  },
  reducers: {
    setCurrentChannel(state, action) {
      const channelId = action.payload;
      state.currentChannelId = channelId;
    },
    addChannel(state, action) {
      const channel = action.payload;
      state.channels = [...state.channels, channel];
    },
    deleteChannel(state, action) {
      const remoteChannelId = action.payload.id;
      const { channels } = state;
      const defaultChannelId = state.channels[0].id;
      const { currentChannelId } = state;

      state.channels = channels.filter((channel) => channel.id !== remoteChannelId);
      state.currentChannelId = (currentChannelId === remoteChannelId)
        ? defaultChannelId
        : currentChannelId;
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
        state.loadingStatus = loadingProcess.LOADING;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        const content = action.payload;

        state.loadingStatus = loadingProcess.IDLE;
        state.channels = content.channels;
        state.currentChannelId = content.currentChannelId;
        state.error = null;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loadingStatus = loadingProcess.FAILING;
        state.error = action.error;
      });
  },
});

export const selectChannels = (state) => state.channels.channels;
export const selectDefaultChannelId = (state) => state.channels.channels[0].id;
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
export const selectFetchError = (state) => state.channels.error;

export const {
  setCurrentChannel, addChannel, deleteChannel, updateChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
