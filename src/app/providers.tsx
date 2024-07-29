"use client";

import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {useAlert} from "@/hooks/useAlert";
import {useAppSelector} from "@/redux/selector";
import {usePathname, useRouter} from "next/navigation";
import {authSelector, authSlice, logout} from "./auth/store/action";
import {EAlert} from "@/enums/alert";
import useAuth from "@/hooks/useAuth";

export function Providers({children}: {children: React.ReactNode}) {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const {is_loggedIn} = useAppSelector(authSelector);
  const {removeAuthInfo, getAuthInfo} = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [online, setOnline] = useState(true);
  const [auth, setAuth] = useState<any>();

  const signOut = () => {
    dispatch(logout());
    removeAuthInfo();
    Alert(EAlert.success, "Logout Successfully");
    router.push("/auth/login");
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const is_loggedIn = localStorage.getItem("is_loggedIn") ?? false;
  //     if (pathname != "/auth/login" && is_loggedIn === false) {
  //       signOut();
  //     }
  //   }
  // }, [pathname, auth]);

  // useEffect(() => {
  //   const auth = getAuthInfo();
  //   console.log("auth :>> ", is_loggedIn, auth);
  //   if (is_loggedIn === false) {
  //     if (pathname === "/auth/login") {
  //       // when unauthorized user and stay in login page
  //       if (auth?.is_loggedIn && auth?.access_token && auth?.user) {
  //         // check auth info localStorage and cookies if true then redirect to previous page
  //         setAuthState();
  //         router.back();
  //       }
  //     } else {
  //       // when user unauthorized then forcefully logout
  //       if (auth?.is_loggedIn && auth?.access_token && auth?.user) {
  //         // check auth info localStorage and cookies if true then redirect to previous page
  //         setAuthState();
  //         router.back();
  //       } else {
  //         // signOut();
  //       }
  //     }
  //   } else {
  //     if (auth?.access_token === "" || auth?.is_loggedIn === false || auth?.user.id === 0) {
  //       // signOut();
  //     }
  //   }
  // }, [pathname]);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("online", () => setOnline(true));
      window.addEventListener("offline", () => setOnline(false));
    }
  }, []);

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {/* <TopLoader /> */}
        {!online && (
          <div className="bg-warning px-4 py-2 text-white">
            <p className="text-center text-sm font-medium">
              No Internet!
              <p className="inline-block mx-1">You're offline. Check your internet connection.</p>
            </p>
          </div>
        )}

        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
