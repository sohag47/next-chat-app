"use client";
type TUser = {
  userName: string;
  roomId: number | string;
};

type ShareableState = {
  auth: TUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
};

const initialState: ShareableState = {
  auth: null,
  isLoading: false,
  isLoggedIn: false,
};

export default initialState;
