// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const parkirInApi = createApi({
  reducerPath: 'parkirInApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://0d22-139-228-111-126.ap.ngrok.io',
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
      query: ({ token }) => ({
        url: '/malls',
        method: 'get',
        headers: {
          access_token: token,
        },
      }),
    }),
    // enpoint mall berdasarkan id
    getMallById: builder.query({
      query: ({ id, token }) => ({
        url: '/malls/' + id,
        method: 'get',
        headers: {
          access_token: token,
        },
      }),
    }),
    // endpoint untuk mendapatkan semua spot parkir berdasarkan mall id
    getParkingSpot: builder.query({
      query: ({ idMall, token }) => ({
        url: '/spots/' + idMall,
        method: 'get',
        headers: {
          access_token: token,
        },
      }),
    }),
    // query untuk bayar
    paySpot: builder.query({
      query: ({ parkingTransactionId, token }) => ({
        url: '/checkOut/' + parkingTransactionId,
        method: 'get',
        headers: {
          access_token: token,
        },
      }),
    }),

    postBookingSpot: builder.mutation({
      query: ({ parkingId, token }) => ({
        url: '/bookings/' + parkingId,
        method: 'post',
        headers: {
          access_token: token,
        },
      }),
    }),
    getInfoBooking: builder.query({
      query: ({ transactionId, token }) => ({
        url: '/tickets/' + transactionId,
        headers: {
          access_token: token,
        },
      }),
    }),
    // enpoint untuk ambil semua tikets
    getAllTickets: builder.query({
      query: ({ token }) => ({
        url: '/tickets',
        headers: {
          access_token: token,
        },
      }),
    }),
    // endpoint untuk mendapatkan nearst mall
    getNearestMall: builder.mutation({
      query: ({ token, locationUser }) => ({
        url: 'nearestMalls',
        headers: {
          access_token: token,
        },
        // format harus {lat:'usu',long:'usu' }
        body: locationUser,
        method: 'post',
      }),
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
  useGetAllTicketsQuery,
  usePostBookingSpotMutation,
  useGetInfoBookingQuery,
  useGetNearestMallMutation,
} = parkirInApi;
