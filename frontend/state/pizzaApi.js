import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// The usersApi slice - handling API interactions for user data
export const pizzaApi = createApi({
  reducerPath: "pizzaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9009/api/pizza/" }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getHistory: builder.query({
      query: () => "history",
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation({
      query: (order) => {
        return { url: "order", method: "POST", body: { ...order } };
      },
      invalidatesTags: ['Orders']
    }),
  }),
});

export const { useGetHistoryQuery, useCreateOrderMutation } = pizzaApi;
