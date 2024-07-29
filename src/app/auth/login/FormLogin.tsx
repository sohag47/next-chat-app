"use client";

import React, {useEffect} from "react";
import {Button, Checkbox, Input} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";

import {authSelector, setCredentials} from "../store/action";

import {useAlert} from "@/hooks/useAlert";
import {EAlert} from "@/enums/alert";
import {EyeSlashFilledIcon} from "@/assets/icons/eye-slash-filled-icon";
import {EyeFilledIcon} from "@/assets/icons/eye-filled-icon";
import useForm, {IValidation} from "@/hooks/useForm";
import {TLogin} from "./login.type";
import {MailIcon} from "@/assets/icons/mail-icon";
import Link from "next/link";
import {useLoginMutation} from "../store/mutation";
import {getCookie, setCookie} from "cookies-next";
import useAuth from "@/hooks/useAuth";
import {TError, TResponse} from "@/types/api-response.type";
import {TAuthState} from "../store/state";
import {useAppSelector} from "@/redux/selector";

export default function FormLogin() {
  const login_secret = process.env.LOGIN_SECRET;

  const Alert = useAlert();
  const dispatch = useDispatch();
  const router = useRouter();
  const {getAuthInfo, setAuthInfo, removeAuthInfo, setAuthState} = useAuth();

  // redux components
  const {is_loggedIn} = useAppSelector(authSelector);
  const [login, {isLoading}] = useLoginMutation();

  // local state
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  // form
  const defaultValues: TLogin = {
    email: "admin@gmail.com",
    password: "12345678",
    remember: true,
  };

  const defaultValidation: IValidation = {
    email: {
      is_required: true,
      error_message: "Email is required field",
    },
    password: {
      is_required: true,
      error_message: "Password is required field",
    },
    remember: {
      is_required: false,
      error_message: "Remember is required field",
    },
  };

  // console.log("getAuthInfo :>> ", getAuthInfo());

  const onSubmit = async (form_data: object) => {
    try {
      const response = await login({
        ...form_data,
        LOGIN_SECRET: login_secret,
      }).unwrap();
      const {success, message, data} = response as TResponse;

      if (success) {
        let auth_data: any = {
          access_token: data?.access_token,
          expires_in: data?.expires_in,
          user: data?.user,
          permission: data?.permission,
          is_loggedIn: true,
        };
        dispatch(setCredentials({...auth_data}));
        setAuthInfo(auth_data);
        Alert(EAlert.success, message ?? "Logged in successfully");
      }
    } catch (error: any) {
      console.log("error :>> ", error);
      setErrors({...error?.data?.errors});
      Alert(EAlert.error, error?.data?.message || error?.message);
    }
  };

  const {form, validations, handleChange, handleSubmit, errors, setErrors} = useForm<TLogin>({
    defaultValues,
    defaultValidation,
    onSubmit,
  });

  useEffect(() => {
    if (!is_loggedIn) {
      const auth = getAuthInfo();

      if (auth?.access_token !== "" || auth?.is_loggedIn || auth?.user.id) {
        setAuthState();
      }
    } else {
      router.push("/");
    }
  }, [is_loggedIn]);

  // console.clear();
  // console.log(
  //   "\n\n\n\n\n\n\n\n               ....            ....\n             ........        .......\n           ............    ......  ....\n         ......    ....  ......    ......\n       ......          ......        ......\n       ......        ......          ......\n         ......    ......          .....\n           ............          .....\n             ........          .....\n               ....             ..\n\n\n\n\n\n\n                                                  ",
  // );

  return (
    <>
      <form className="ml-10 my-3 xl:mx-20 grid grid-cols-1 gap-5" onSubmit={handleSubmit}>
        <Input
          className="text-dark dark:text-dark font-medium md:min-w-80 w-full "
          endContent={
            <MailIcon className="text-2xl text-dark dark:text-dark pointer-events-none" />
          }
          errorMessage={errors?.email ? errors?.email : ""}
          isDisabled={isLoading}
          isInvalid={errors?.email ? true : false}
          label={
            <span className="text-dark dark:text-dark font-semibold">
              Email {validations?.email?.is_required && <span className="text-danger">*</span>}
            </span>
          }
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="text"
          value={form?.email?.toString() || ""}
          variant="bordered"
          onValueChange={(data) => handleChange("email", data)}
        />
        <Input
          className="text-dark dark:text-dark font-medium md:min-w-80 w-full"
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-dark dark:text-dark pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-dark dark:text-dark pointer-events-none" />
              )}
            </button>
          }
          errorMessage={errors?.password ? errors?.password : ""}
          isDisabled={isLoading}
          isInvalid={errors?.password ? true : false}
          label={
            <span className="font-semibold text-dark dark:text-dark">
              Password{" "}
              {validations?.password?.is_required && <span className="text-danger">*</span>}
            </span>
          }
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
          value={form?.password?.toString() || ""}
          variant="bordered"
          onValueChange={(data) => handleChange("password", data)}
        />
        <div className="flex items-center justify-between">
          <Checkbox
            isSelected={form?.remember}
            className="text-dark dark:text-dark font-medium"
            isDisabled={isLoading}
            onValueChange={(data) => handleChange("remember", data)}
            value={form?.remember?.toString() || ""}
          >
            <p className="text-dark dark:text-dark font-medium">Remember me</p>
          </Checkbox>
        </div>

        <Button
          className="bg-primary text-light font-medium"
          isLoading={isLoading}
          radius="full"
          spinner={
            <svg
              className="animate-spin h-5 w-5 text-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
          }
          type="submit"
        >
          Log in
        </Button>
      </form>
    </>
  );
}
