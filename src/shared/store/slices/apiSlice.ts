import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    // Payments
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: 'create-payment-intent',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useCreatePaymentIntentMutation } = apiSlice
