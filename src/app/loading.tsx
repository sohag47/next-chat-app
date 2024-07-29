import React from "react";
import "../styles/loading.css";
export default function Loading(): React.ReactNode {
  return (
    <div className="flex h-[75vh] items-center justify-center bg-light dark:bg-dark rounded-md mt-3">
      <div className="loader">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>
    </div>
  );
}
