import { useState } from "react";

export default function useCookies() {

  const setCookies = (key: any, value: any, ext_days: any) => {
    const current_date = new Date();
    current_date.setTime(current_date.getTime() + (ext_days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + current_date.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
  }

  const getCookies = (key: any) => {
    let name = key + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const removeCookies = (key: any, value: any,) => {
    setCookies(key, value, 0);

  }


  return {
    setCookies,
    getCookies,
    removeCookies
  }
}

