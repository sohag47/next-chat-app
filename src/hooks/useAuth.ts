/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable prettier/prettier */

"use client";

import { useDispatch } from "react-redux";
import { setCredentials } from "@/app/auth/store/action";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { TAuthState } from "@/app/auth/store/state";

export default function useAuth() {
  const dispatch = useDispatch();


  const setAuthInfo = (payload: TAuthState) => {
    if (typeof window !== "undefined" && payload?.access_token) {
      // setCookie("access_token", payload?.access_token, {
      //   path: "/",
      //   secure: true,
      //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      //   sameSite: "strict",
      // });
      localStorage.setItem("access_token", payload?.access_token);
      localStorage.setItem("is_loggedIn", JSON.stringify(payload?.is_loggedIn));
      localStorage.setItem("user", JSON.stringify(payload?.user));
      localStorage.setItem("permission", JSON.stringify(payload?.permission));
    }
  }

  const getAuthInfo = () => {
    if (typeof window !== "undefined") {
      const is_loggedIn = localStorage.getItem("is_loggedIn");
      const token = localStorage.getItem("access_token");
      // const token = getCookie("access_token");
      const user = localStorage.getItem("user");
      const permission = localStorage.getItem("permission");

      let auth_status = is_loggedIn ? JSON.parse(is_loggedIn) : false;
      let auth_token = token ? token : "";
      let auth_user = user ? JSON.parse(user) : {};
      let auth_permission = permission ? JSON.parse(permission) : "";

      return { is_loggedIn: auth_status, access_token: auth_token, user: auth_user, permission: auth_permission };
    }
  }

  const setAuthState = () => {
    dispatch(setCredentials(getAuthInfo()));
  }

  const checkedAuth = (): boolean => {
    let status = false;
    const auth_data = getAuthInfo();
    if (auth_data?.is_loggedIn) {
      status = true;
    } else {
      status = false
    }
    return status;
  }

  const removeAuthInfo = () => {
    if (typeof window !== "undefined") {
      // deleteCookie("access_token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("is_loggedIn");
      localStorage.removeItem("user");
      localStorage.removeItem("permission");
    }
  }


  return {
    setAuthInfo,
    setAuthState,
    getAuthInfo,
    removeAuthInfo
  };
}
