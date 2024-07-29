"use client";

// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import APIHeader from "@/redux/APIHeader";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// AUTH API GATEWAY URL
const USERS_SERVICE = `/users`;

const apiTag = APIHeader.enhanceEndpoints({
  addTagTypes: ["Auth"],
});

export const AuthMutation = apiTag.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_SERVICE}/login`,
        method: "POST",
        body: data,
      }),
    }),
    uploadFiles: builder.mutation({
      query: (data: any) => ({
        url: `/upload-files`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {useLoginMutation, useUploadFilesMutation} = AuthMutation;
