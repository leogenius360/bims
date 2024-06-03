"use client"

import { useRef, useState } from "react";
import NextLink from "next/link";
import {
	Button,
	Input,
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
	useDisclosure,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownSection,
	DropdownItem,
	Avatar,
	User,
} from "@nextui-org/react";

import { siteConfig } from "@/config/site";
import clsx from "clsx";

import { Logo } from "@/components/icons";
import { FiMenu, FiPhone, FiX } from "react-icons/fi";
import { UserProfile } from "@/components/user_profile";
import { usePathname } from "next/navigation";
import { SingleThemeSwitch, ThemeSwitch } from "./theme-switch";


export interface NavbarProps {
	isLoggedIn?: boolean | undefined;
}


export const Navbar = ({ isLoggedIn }: NavbarProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	return (
		<NextUINavbar isBordered maxWidth="2xl" className="border-b-1 border-orange-100 dark:border-default shadow-md shadow-orange-100 dark:shadow-none"
			classNames={{ wrapper: "px-2 lg:px-6" }}
		>
			<NavbarContent className="gap-1">
				<Dropdown placement="bottom-start" offset={16} crossOffset={-20} showArrow radius="sm" shadow="md"
					onOpenChange={setIsMenuOpen} isOpen={isMenuOpen} classNames={{ trigger: "md:hidden" }}>
					<DropdownTrigger>
						<Button isIconOnly size="sm" variant="light" aria-label="Menu" >
							{isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
						</Button>
					</DropdownTrigger>

					<DropdownMenu variant="faded" aria-label="Dropdown menu with description">
						<DropdownSection title="Actions">
							{siteConfig.navItems.map((item) => (
								<DropdownItem key={item.label}>
									<NextLink href={item.href}>
										{item.label}
									</NextLink>
								</DropdownItem>
							))}
						</DropdownSection>

						<DropdownSection className="mb-0">
							<DropdownItem key="theme" isReadOnly className="cursor-default">
								<ThemeSwitch />
							</DropdownItem>
						</DropdownSection>
					</DropdownMenu>
				</Dropdown>

				<NavbarBrand className="font-bold text-sm lg:text-base">
					<NextLink className="flex justify-start items-center gap-0 md:gap-1" href="/">
						<Logo />
						<p className="" aria-label="Genius Tech Space">{siteConfig.shortName}</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>

			{/* navItems */}
			<NavbarContent className="hidden md:flex gap-3 lg:ms-5">
				{siteConfig.navItems.map((item) => (
					<NavbarItem key={item.href}>
						<NextLink
							className={clsx(
								"text-sm hover:shadow-orange-400 dark:hover:shadow-slate-500 rounded px-2 py-1 shadow-sm",
								{
									["shadow-orange-400 dark:shadow-slate-500"]: item.href === pathname,
								}
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
			<NavbarContent className="gap-5 md:gap-5" justify="end">
				<button type="button" aria-label="theme" className="w-4 h-7" >
					<SingleThemeSwitch />
				</button>

				{isLoggedIn ?
					<UserProfile />
					:
					<Button
						as={NextLink} href="/" radius="sm" color="primary" variant="light" size="sm"
						// endContent={<FiChevronsRight />}
						className="font-semibold text-sm text-primary"
					>
						Login
					</Button>
				}

				<Button
					as={NextLink} size="sm" href="/" radius="full" color="primary" variant="ghost"
					endContent={<FiPhone />}
					className="hidden lg:flex h-6 lg:h-7 ring-offset-1 ring-1 ring-orange-600 dark:ring-offset-gray-800 font-semibold min-w-28 text-sm dark:text-white"
				>
					Support
				</Button>
			</NavbarContent>
		</NextUINavbar>
	);
};
