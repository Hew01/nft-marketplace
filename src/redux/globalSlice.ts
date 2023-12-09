// allowanceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  allowance: bigint;
  balance: bigint;
  newNftEvent: string;
}

const initialState: GlobalState = {
  allowance: BigInt(0),
  balance: BigInt(0),
  newNftEvent: '',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setAllowance: (state, action: PayloadAction<{allowance: bigint}>) => {
      state.allowance = action.payload.allowance;
    },
    setBalanceOf: (state, action: PayloadAction<{balance: bigint}>) => {
      state.balance = action.payload.balance;
    },
    setNewNftEvent: (state, action: PayloadAction<{newNftEvent: string}>) => {
      state.newNftEvent = action.payload.newNftEvent;
    },
  },
});

export const { setAllowance, setBalanceOf, setNewNftEvent } = globalSlice.actions;

export default globalSlice.reducer;
