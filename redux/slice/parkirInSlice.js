import { createSlice } from '@reduxjs/toolkit';

export const parkirIn = createSlice({
  name: 'parkirIn',
  initialState: {
    idMall: 0,
    parkingTransactionId: 1,
  },
  reducers: {
    getExactIdMall: (state, action) => {
      const { idMall } = action.payload;
      state.idMall = idMall;
    },
    getParkingTransactionId: (state, action) => {
      const { parkingTransactionId } = action.payload;
      state.parkingTransactionId = parkingTransactionId;
    },
  },
});

export const { getExactIdMall, getParkingTransactionId } = parkirIn.actions;
