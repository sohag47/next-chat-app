type TColor = "primary" | "secondary" | "success" | "warning" | "default" | "danger" | undefined;
type TSize = "sm" | "md" | "lg" | undefined;

export type IThemeSwitcherProps = {
  switcher?: TColor;
  size?: TSize;
};
