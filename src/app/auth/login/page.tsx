"use client";
import React from "react";

import gov from "/public/images/gov.png";
import lock from "/public/images/lock.png";

import Image from "next/image";
import FormLogin from "./FormLogin";
import {Link} from "@nextui-org/react";

export default function Login() {
  return (
    <>
      <main className="login">
        <div className="flex h-screen items-center justify-center">
          <div className="bg-white">
            <div className="grid md:grid-cols-2">
              <div className="hidden w-full bg-secondary p-5 md:block">
                <p className="text-center text-base text-white font-bold">
                  <span className="text-yellow-500">Welcome To </span>
                  <span className="ml-1">{process.env.APP_NAME ?? ""}</span>
                </p>
                <Image alt="" className="mx-auto my-5 h-72 w-72 p-5" src={gov} />
                <p className="text-center text-base text-yellow-500 font-bold">
                  {process.env.ORG_NAME ?? ""}
                </p>
              </div>
              <div className="w-full p-5">
                <Image alt="" className="mx-auto hidden h-16 w-fit md:block" src={lock} />
                <Image alt="" className="mx-auto h-16 md:hidden" src={gov} />
                <h1 className="text-center text-xl font-bold text-secondary">
                  {process.env.APP_NAME ?? ""} STAFF ACCESS PANEL
                </h1>

                <FormLogin />

                <hr className="mx-10" />
                <div className="mt-3 text-center text-secondary text-sm">
                  <Link href="#" underline="hover" size="sm">
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
