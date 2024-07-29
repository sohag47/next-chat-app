"use client";

import {Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  useEffect(() => {}, [error]);
  const router = useRouter();
  const handleBack = () => {
    reset();
    router.back();
  };

  const test = () => {
    console.log("Hello World");
  };

  return (
    <>
      <main className="text-center flex items-center justify-center h-[80vh] my-auto md:w-[32rem] w-[20rem] mx-auto text-dark/80 dark:text-light">
        <div>
          <h1 className="md:text-8xl text-6xl font-bold my-5">Oops !</h1>
          <h1 className="lg:text-2xl md:text-xl text-dark/80 dark:text-light/80 font-bold my-5">
            500 | Internal Server Error
          </h1>
          <p className="text-dark/80 dark:text-light/80 font-bold">
            The server encountered an internal error or misconfiguration and was unable to complete
            your request
          </p>
          <Button
            className="uppercase px-5 py-3 font-bold rounded my-3 bg-base-gradient text-light"
            onClick={handleBack}
          >
            {"Go -> Back"}
          </Button>
        </div>
      </main>
    </>
  );
}
