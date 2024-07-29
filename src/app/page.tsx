"use client";
import React, {Suspense, useEffect} from "react";
import {Button, Card, CardBody, CardHeader, Image, Input} from "@nextui-org/react";

import Link from "next/link";

import {dashboardData} from "@/assets/db/dashboard";
import Footer from "@/components/footer";
import RSkeleton from "@/components/skeleton";
import {Icon} from "@iconify/react";
import {useAlert} from "@/hooks/useAlert";
import {TError, TResponse} from "@/types/api-response.type";
import {EAlert} from "@/enums/alert";
import {useDispatch} from "react-redux";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {useGetSelfLibraryMutation} from "@/redux/shared/mutation";
import {shareableSelector} from "@/redux/shared/action";
import useForm, {IValidation} from "@/hooks/useForm";
import {useAppSelector} from "@/redux/selector";
import FormSkeleton from "@/components/form.skeleton";
import FormChat from "./form.chat";
import Signup from "./auth/signup/page";
import {socket} from "./socket";
import ChatPage from "./chat/form-chat";

export default function Dashboard(): React.ReactNode {
  // redux components
  const {auth, isLoading, isLoggedIn} = useAppSelector(shareableSelector);

  return (
    <div className="mx-[35vw] mt-[30vh]">
      <Card>
        <CardHeader>
          {auth ? (
            <p>
              Name: <b>{auth?.userName}</b> and Room Id: <b>{auth?.roomId}</b>
            </p>
          ) : (
            <h1 className="text-lg font-bold text-center">Login Page</h1>
          )}
        </CardHeader>
        <CardBody>
          {isLoggedIn ? <ChatPage socket={socket} auth={auth} /> : <Signup socket={socket} />}
          {/* <ChatPage socket={socket} auth={auth} /> */}
        </CardBody>
      </Card>
      <Footer styles="" />
    </div>
  );
}
