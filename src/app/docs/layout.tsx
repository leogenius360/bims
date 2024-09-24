
import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
import clsx from "clsx";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";


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
		<main className="min-h-screen flex flex-col justify-between">
			{children}
	  </main>
	);
}
