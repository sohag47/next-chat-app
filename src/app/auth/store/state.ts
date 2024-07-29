"use client";

import { TPermission, TUser } from "./type.store";


export type TAuthState = {
  is_loggedIn?: boolean;
  access_token: string;
  expires_in: number;
  user: TUser | any;
  permission: TPermission[];
};

const initialState: TAuthState = {
  is_loggedIn: false,
  permission: [],
  user: {},
  access_token: "",
  expires_in: 0,
};

export default initialState;
