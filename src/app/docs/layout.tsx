
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import clsx from "clsx";
import { Navbar } from "@/components/navbar";
import Link from "next/link";


export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "../favicon.ico",
		shortcut: "../favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	keywords: "Brainbox Research Institute"
};


export default function DocsLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<section>
			{children}
		</section>
	);
}
