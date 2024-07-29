"use client";

import APIHeader from "@/redux/APIHeader";

// AUTH API GATEWAY URL
const LIBRARY_API_URL = `${process.env.BASE_URL}/admin`;

const apiTag = APIHeader.enhanceEndpoints({
  addTagTypes: ["Shared"],
});


export const ShareableMutation = apiTag.injectEndpoints({
  endpoints: (builder) => ({
    getSelfLibrary: builder.mutation({
      query: () => ({
        url: `${LIBRARY_API_URL}/me`,
        method: "GET",
      }),
    }),
    getUserProfile: builder.mutation({
      query: (user_id: number) => ({
        url: `${LIBRARY_API_URL}/${user_id}/profile`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSelfLibraryMutation, useGetUserProfileMutation } = ShareableMutation;
