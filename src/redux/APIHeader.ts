/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable prettier/prettier */
'use client';
import { TResponse } from '@/types/api-response.type';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'cookies-next';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BASE_URL,
  prepareHeaders: (headers) => {
    // const token = getCookie("access_token");
    const token = localStorage.getItem("access_token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    }

  },
});

const formatErrorResponse = (code: number, message?: string, errors?: any) => {
  return {
    error: {
      success: false,
      code: code,
      message: message,
      errors: errors ?? null,
    },
  };
};

const formatSuccessResponse = (success: boolean, code: number, message?: string, data?: any | any[], errors?: any) => {
  return {
    error: {
      success: success,
      code: code,
      message: message,
      data: data ?? null,
      errors: errors ?? null,
    },
  };
};

const baseQueryWithReactAuth = async (args: any, api: any, extraOptions: any) => {
  let result: any = await baseQuery(args, api, extraOptions);

  // console.log('result :>> ', result);


  // if (!window.navigator.onLine) {
  //   // check internet connections
  //   return formatErrorResponse(503, "You're offline. Check your internet connection.");
  // }

  if (result?.error?.status === 401) {
    // User Unauthorized
    localStorage.removeItem('is_loggedIn');
    const response_data = result?.error?.data as TResponse;
    return formatErrorResponse(result?.error?.status, response_data?.message, response_data?.errors);
  }
  if (parseInt(result?.error?.status) < 600 && parseInt(result?.error?.status) > 200) {
    // Server Connection Not Found
    return formatErrorResponse(result?.error?.status, result?.error?.data?.message, result?.error?.data?.errors);
  }
  if (result?.error?.status === "FETCH_ERROR") {
    // Server Connection Not Found
    localStorage.removeItem('is_loggedIn');
    return formatErrorResponse(503, `Failed to fetch! Check server connections`, result?.error?.error);
  }
  // if (result?.error?.status === 200) {
  //   return formatSuccessResponse(result?.data?.success, result?.error?.status, result?.data?.message, result?.data?.data, result?.data?.errors);
  // }
  return result;
};

const APIHeader = createApi({
  baseQuery: baseQueryWithReactAuth,
  endpoints: () => ({}),
});

export default APIHeader;
