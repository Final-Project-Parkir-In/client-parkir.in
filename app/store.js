import { configureStore } from '@reduxjs/toolkit';
import { parkirInApi } from '../redux/services/parkirInApi';
import { parkirIn } from '../redux/slice/parkirInSlice';
export const store = configureStore({
  reducer: {
    [parkirInApi.reducerPath]: parkirInApi.reducer,
    parkirInSlice: parkirIn.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(parkirInApi.middleware),
});
