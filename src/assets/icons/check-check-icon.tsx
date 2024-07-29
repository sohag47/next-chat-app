import {IIconProps} from "@/types/props-icon";

export function CheckCheckIcon(props: IIconProps) {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18 6L7 17l-5-5m20-2l-7.5 7.5L13 16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}
