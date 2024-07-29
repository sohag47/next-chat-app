"use client";
import {Suspense} from "react";
import {Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";

import Loading from "./loading";

export default function NotFound() {
  const router = useRouter();

  return (
    <Suspense fallback={<Loading />}>
      <main className="text-center flex items-center justify-center h-[80vh] my-auto md:w-[32rem] w-[20rem] mx-auto text-dark/80 dark:text-light">
        <div>
          <h1 className="md:text-8xl text-6xl font-bold my-5">Oops !</h1>
          <h1 className="lg:text-2xl md:text-xl text-dark/80 dark:text-light/80 font-bold my-5">
            404 | Page Not Found
          </h1>
          <p className="text-dark/80 dark:text-light/80 font-bold">
            The page you are looking for might have been removed hade its name changed or is
            temporarily unavailable
          </p>
          <Button
            className="uppercase px-5 py-3 font-bold rounded my-3 bg-base-gradient text-light"
            onClick={() => router.back()}
          >
            {"Go -> Back"}
          </Button>
        </div>
      </main>
    </Suspense>
  );
}
