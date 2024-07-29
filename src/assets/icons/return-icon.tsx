import { IIconProps } from "@/types/props-icon";
import React from "react";

export function ReturnIcon(props: IIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M9 14L4 9l5-5"></path>
        <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
      </g>
    </svg>
  );
}
