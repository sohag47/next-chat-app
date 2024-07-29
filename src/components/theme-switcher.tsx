"use client";
import {Button} from "@nextui-org/react";
import {useTheme} from "next-themes";
import React, {useEffect, useState} from "react";

import {SunIcon} from "@/assets/icons/sun-icon";
import {MoonIcon} from "@/assets/icons/moon-icon";
import {IThemeSwitcherProps} from "@/types/theme.type";

export function ThemeSwitcher({switcher, size}: IThemeSwitcherProps): React.ReactNode {
  const [mounted, setMounted] = useState(false);
  const {theme, setTheme} = useTheme();

  useEffect(() => {
    if (!theme) {
      setTheme("light");
    }
    setMounted(true);
  }, [setTheme, theme]);

  if (!mounted) return null;

  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button isIconOnly color={switcher ?? "default"} size={size ?? "sm"} onClick={handleTheme}>
      {theme === "light" ? <MoonIcon height={16} width={16} /> : <SunIcon height={16} width={16} />}
    </Button>
  );
}
