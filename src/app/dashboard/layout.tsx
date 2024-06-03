import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";


export const metadata: Metadata = {
	title: {
		default: "Dashboard",
		template: `%s - ${siteConfig.shortName}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	keywords: "Brainbox Research Institute"
};


export default function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar isLoggedIn />
			{children}
		</>
	);
}
