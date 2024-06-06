"use client";

import { useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { NavbarContent, Button, NavbarBrand, Navbar } from "@nextui-org/react";
import { FiX, FiMenu, FiPhone } from "react-icons/fi";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";
import { SingleThemeSwitch } from "@/components/theme-switch";
import { UserProfile } from "@/components/user_profile";
import useWindowSize from "@/lib/window_size";

// export const metadata: Metadata = {
//   title: {
//     default: 	"Dashboard",
//     template: `%s - ${siteConfig.shortName}`,
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon-16x16.png",
//     apple: "/apple-touch-icon.png",
//   },
//   keywords: "Brainbox Research Institute",
// };

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width } = useWindowSize();
  const [isMenuOpen, setIsMenuOpen] = useState(
    width && width < 768 ? true : false,
  );
  const pathname = usePathname();
  const isLoggedIn = true;
  return (
    <>
      <Navbar
        isBordered
        maxWidth="2xl"
        className="border-b-1 border-emerald-100 shadow shadow-emerald-100 dark:border-default dark:shadow-none"
        classNames={{ wrapper: "px-2 lg:px-6" }}
      >
        <NavbarContent className="gap-1">
          <button
            aria-label="Menu"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={clsx({ ["hidden"]: width && width >= 768 })}
          >
            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <NavbarBrand className="text-sm font-bold lg:text-base">
            <NextLink
              className="flex items-center justify-start gap-0 md:gap-1"
              href="/"
            >
              <Logo />
              <p className="" aria-label="Genius Tech Space">
                {siteConfig.shortName}
              </p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        {/* End/Left side navItems */}
        <NavbarContent className="gap-5 md:gap-5" justify="end">
          <button type="button" aria-label="theme" className="h-7 w-4">
            <SingleThemeSwitch />
          </button>

          {isLoggedIn ? (
            <UserProfile />
          ) : (
            <Button
              as={NextLink}
              href="/dashboard"
              radius="sm"
              color="primary"
              variant="light"
              size="sm"
              // endContent={<FiChevronsRight />}
              className="text-sm font-semibold text-primary"
            >
              Login
            </Button>
          )}

          <Button
            as={NextLink}
            size="sm"
            href="/dashboard"
            radius="sm"
            color="primary"
            variant="ghost"
            endContent={<FiPhone />}
            className="hidden text-sm font-semibold ring-1 ring-emerald-600 ring-offset-1 lg:flex dark:text-white dark:ring-offset-gray-800"
          >
            New transaction
          </Button>
        </NavbarContent>
      </Navbar>

      <section className="flex">
        <aside
          className={clsx(
            "custom-scrollbar h-[calc(100vh-4.25rem)] min-w-[95.5vw] overflow-auto border-r-1 border-emerald-200 shadow-md shadow-emerald-100 md:min-w-64 dark:border-default dark:shadow-default",
            { ["hidden"]: !isMenuOpen && width && width < 768 },
          )}
        >
          <div className="flex h-full flex-col justify-between px-3 pb-2 pt-6">
            <ul className="flex flex-col gap-3">
              {siteConfig.navItems.map((item) => (
                <li
                  key={item.href}
                  className={clsx(
                    "w-full rounded px-3 py-2 font-medium shadow-sm hover:shadow-emerald-400 dark:hover:shadow-slate-500",
                    {
                      ["shadow-emerald-400 dark:shadow-slate-500"]:
                        item.href === pathname,
                    },
                  )}
                >
                  <NextLink color="foreground" href={item.href}>
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>

            <Button
              as={NextLink}
              size="sm"
              href="/dashboard"
              radius="full"
              color="primary"
              variant="ghost"
              endContent={<FiPhone />}
              className="text-sm font-semibold ring-1 ring-emerald-600 ring-offset-1 dark:text-white dark:ring-offset-gray-800"
            >
              Contact support
            </Button>
          </div>
        </aside>
        <main className="custom-scrollbar h-[calc(100vh-4.25rem)] w-full overflow-auto">
          {children}
        </main>
      </section>
    </>
  );
}
