import { createSlice } from '@reduxjs/toolkit';

export const parkirIn = createSlice({
  name: 'parkirIn',
  initialState: {
    idMall: 0,
    parkingTransactionId: 1,
    token: '',
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
    takeToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
  },
});

export const { getExactIdMall, getParkingTransactionId, takeToken } =
  parkirIn.actions;
