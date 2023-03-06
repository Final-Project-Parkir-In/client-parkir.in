// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const parkirInApi = createApi({
  reducerPath: 'parkirInApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://5aae-139-228-111-126.ap.ngrok.io',
  }),
  endpoints: (builder) => ({
    // endpoint untuk user register
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'post',
        // user data harus {email:'uus',password:'uuw',etc}
        body: userData,
      }),
    }),
    // endpoint untuk login
    loginUser: builder.mutation({
      query: (userData) => ({
        url: '/login',
        method: 'post',
        // user data harus {email:'uus',password:'uuw'}
        body: userData,
      }),
    }),
    // endpoint ambil semua malls
    getAllMalls: builder.query({
      query: () => '/malls',
    }),
    // enpoint mall berdasarkan id
    getMallById: builder.query({
      query: (id) => '/malls/' + id,
    }),
    // endpoint untuk mendapatkan semua spot parkir berdasarkan mall id
    getParkingSpot: builder.query({
      query: (mallId) => '/spots/' + mallId,
    }),
    // query untuk bayar
    paySpot: builder.query({
      query: (parkingTransactionId) => '/checkOut/' + parkingTransactionId,
    }),
  }),
});
export const {
  useGetAllMallsQuery,
  useGetMallByIdQuery,
  usePaySpotQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetParkingSpotQuery,
} = parkirInApi;
