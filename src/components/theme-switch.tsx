"use client";

import { FC, ReactNode } from "react";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { MdBedtime, MdContrast, MdLightMode } from "react-icons/md";
import { Button } from "@nextui-org/react";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = () => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  return (
    <div
      className="flex justify-between"
      aria-label={`Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`}
    >
      <h3 className="font-mono font-semibold">Theme: </h3>
      <MdLightMode
        size={18}
        onClick={() => setTheme("light")}
        color={theme === "light" ? "#3b82f6" : undefined}
        className="cursor-pointer"
      />
      <MdContrast
        size={18}
        onClick={() => setTheme("system")}
        color={theme === "system" ? "#3b82f6" : undefined}
        className="cursor-pointer"
      />
      <MdBedtime
        size={18}
        onClick={() => setTheme("dark")}
        color={theme === "dark" ? "#3b82f6" : undefined}
        className="cursor-pointer"
      />
    </div>
  );
};

export const SingleThemeSwitch: FC<ThemeSwitchProps> = () => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const title = `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`;

  return (
    <div className="flex justify-between" title={title} aria-label={title}>
      {theme === "light" ? (
        <Button
          isIconOnly
          size="sm"
          variant="ghost"
          aria-label="theme"
          onClick={() => setTheme("dark")}
        >
          <MdBedtime size={18} />
        </Button>
      ) : (
        <Button
          isIconOnly
          size="sm"
          variant="ghost"
          aria-label="theme"
          onClick={() => setTheme("light")}
        >
          <MdLightMode size={18} />
        </Button>
      )}
    </div>
  );
};
