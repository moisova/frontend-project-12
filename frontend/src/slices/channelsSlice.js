import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels: (state, action) => {
      const channels = action.payload;
      state.channels = channels;
    },
    setCurrentChannel: (state, action) => {
      const id = action.payload;
      state.currentChannelId = id;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((c) => c.id !== action.payload);
      if (state.currentChannelId === action.payload) {
        const generalChannel = state.channels.find((c) => c.name === "general");
        state.currentChannelId = generalChannel ? generalChannel.id : null;
      }
    },
    renameChannel: (state, action) => {
      const channel = state.channels.find((c) => c.id === action.payload.id);
      if (channel) {
        channel.name = action.payload.name;
      }
    },
  },
});

export const {
  setChannels,
  setCurrentChannel,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
