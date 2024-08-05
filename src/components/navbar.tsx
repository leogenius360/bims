"use client";

import { useRef, useState } from "react";
import NextLink from "next/link";
import {
  Button,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Badge,
  Avatar,
} from "@nextui-org/react";

import { internalUrls, siteConfig } from "@/config/site-config";
import clsx from "clsx";

import { Logo } from "@/components/icons";
import { FiMenu, FiPhone, FiX } from "react-icons/fi";
import { FaCartFlatbed } from "react-icons/fa6";
import { UserProfile } from "@/components/user_profile";
import { usePathname } from "next/navigation";
import { SingleThemeSwitch, ThemeSwitch } from "./theme-switch";
import { SupportButton } from "./buttons";
import { useAuth } from "@/auth/provider";
import { useCart } from "@/cart/provider";

export interface NavbarProps {
  isLoggedIn?: boolean | undefined;
}

export const Navbar = ({ isLoggedIn }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const { cart, getProducts } = useCart();

  return (
    <NextUINavbar
      isBordered
      maxWidth="2xl"
      className="border-b-1 border-emerald-100 shadow-md shadow-emerald-100 dark:border-default dark:shadow-none"
      classNames={{ wrapper: "px-2 lg:px-6" }}
    >
      <NavbarContent className="gap-1">
        <Dropdown
          placement="bottom-start"
          offset={16}
          crossOffset={-20}
          showArrow
          radius="sm"
          shadow="md"
          onOpenChange={setIsMenuOpen}
          isOpen={isMenuOpen}
          classNames={{ trigger: "md:hidden" }}
        >
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="ghost" aria-label="Menu">
              {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownSection title="Menu">
              {siteConfig.navItems.map((item) => (
                <DropdownItem key={item.label}>
                  <NextLink href={item.href}>{item.label}</NextLink>
                </DropdownItem>
              ))}
            </DropdownSection>

            <DropdownSection className="mb-0">
              <DropdownItem>
                <SupportButton />
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>

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

      {/* navItems */}
      <NavbarContent className="hidden gap-3 md:flex lg:ms-5">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink
              className={clsx(
                "rounded px-2 py-1 text-sm shadow-sm hover:shadow-emerald-400 dark:hover:shadow-slate-500",
                {
                  ["shadow-emerald-400 dark:shadow-slate-500"]:
                    item.href === pathname,
                },
              )}
              color="foreground"
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* End/Left side navItems */}
      <NavbarContent className="gap-3 lg:gap-5" justify="end">
        <SingleThemeSwitch />
        <Badge content={getProducts().length} color="primary">
          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            data-bs-toggle="offcanvas"
            data-bs-target="#updateCartForm"
            aria-controls="updateCartForm"
          >
            <FaCartFlatbed size={18} />
          </Button>
        </Badge>

        {user ? (
          <UserProfile />
        ) : (
          <Button
            as={NextLink}
            href={internalUrls.login}
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
        <div className="hidden md:flex">
          <SupportButton />
        </div>
      </NavbarContent>
    </NextUINavbar>
  );
};
