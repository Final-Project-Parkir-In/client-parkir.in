// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const parkirInApi = createApi({
  reducerPath: 'parkirInApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://e435-182-0-205-74.ap.ngrok.io',
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
      query: ({ token, query }) => {
        let urlHit = '/malls';

        return {
          url: urlHit,
          method: 'get',
          headers: {
            access_token: token,
          },
        };
      },
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
        url: '/nearestMalls',
        headers: {
          access_token: token,
        },
        // format harus {lat:'usu',long:'usu' }
        body: locationUser,
        method: 'post',
      }),
    }),
    postAddCar: builder.mutation({
      query: ({ dataCar, userId }) => ({
        url: '/cars/' + userId,
        method: 'post',
        body: dataCar,
      }),
    }),
    getAllCars: builder.query({
      query: ({ token }) => ({
        url: '/cars',
        headers: {
          access_token: token,
        },
      }),
    }),
    addSecondCarr: builder.mutation({
      query: ({ token, carData }) => ({
        url: '/addSecondCar',
        // { numberPlate, brand, type } haru gini carDatanya
        body: carData,
        headers: {
          access_token: token,
        },
        method: 'post',
      }),
    }),
    changeDefaultCar: builder.mutation({
      query: ({ token, carId }) => {
        return {
          url: '/changeDefaultCar/' + carId,
          headers: {
            access_token: token,
          },
          method: 'patch',
        };
      },
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
  usePostAddCarMutation,
  useGetAllCarsQuery,
  useAddSecondCarrMutation,
  useChangeDefaultCarMutation,
} = parkirInApi;
