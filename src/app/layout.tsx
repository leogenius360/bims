
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig, siteFooter } from "@/config/site";
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
				"min-h-screen bg-background font-sans antialiased flex flex-col justify-between",
				fontSans.variable, inter.className
			)}
			>
				<Providers attribute="class" defaultTheme="system" enableSystem>
					{children}
				</Providers>

				<footer className="card border-0 border-t-1 border-emerald-200 dark:border-default py-3 px-4 shadow-inner shadow-emerald-50 dark:shadow-default">
					<div className="max-w-screen-2xl mx-auto flex flex-wrap justify-center md:justify-between gap-x-6 gap-y-2 text-sm">
						<div className="inline-flex flex-nowrap gap-x-6">
							{siteFooter.termsAndConditions.map((item) => (
								<Link target="blank" key={item.href}
									className="flex flex-wrap items-center gap-1 text-current hover:text-sky-600 hover:underline underline-offset-2"
									href={item.href}
									title={item.label}
								>
									<small className="font-bold"> {item.label} </small>
								</Link>
							))}
						</div>

						
						<div className="inline-flex flex-nowrap gap-x-6">
							{siteFooter.socialLinks.map((item) => (
								<Link target="blank" key={item.href}
									className="flex flex-wrap items-center gap-1 text-current hover:text-sky-600 hover:underline underline-offset-2"
									href={item.href}
									title={item.label}
								>
									<small className="font-bold"> {item.label} </small>
								</Link>
							))}
						</div>

						<Link target="blank"
							className="flex flex-wrap items-center gap-1 text-current hover:text-sky-600 hover:underline underline-offset-2"
							href={siteFooter.developer.href}
							title={siteFooter.developer.label}
						>
							<small className="font-bold"> {siteFooter.developer.label} </small>
						</Link>

					</div>
				</footer>
			</body>
		</html>
	);
}
