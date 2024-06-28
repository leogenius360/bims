
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig, siteFooter } from "@/config/site-config";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";
import Link from "next/link";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: "Home",
		template: `%s - ${siteConfig.shortName}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "../favicon.ico",
		shortcut: "../favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	keywords: siteConfig.keywords
};


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={clsx(
				"bg-background font-sans antialiased",
				fontSans.variable, inter.className
			)}
			>
				<Providers attribute="class" defaultTheme="system" enableSystem>
					{children}
				</Providers>
			</body>
		</html>
	);
}
