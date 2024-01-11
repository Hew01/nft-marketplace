// allowanceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  newNftEvent: string;
}

const initialState: GlobalState = {
  newNftEvent: '',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setNewNftEvent: (state, action: PayloadAction<{newNftEvent: string}>) => {
      state.newNftEvent = action.payload.newNftEvent;
    },
  },
});

export const { setNewNftEvent } = globalSlice.actions;

export default globalSlice.reducer;
