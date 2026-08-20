import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      const messages = action.payload;
      state.messages = messages;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
