export type SiteConfig = typeof siteConfig;

export const internalUrls = {
	// Base URL
	home: '/',

	// Auth URLs
	auth: '/auth',
	login: '/auth/login',
	signUp: '/auth/signup',

	// Navigation URLs
	dashboard: '/dashboard',
	history: '/dashboard/history',
	reports: '/dashboard/reports',
	docs: '/docs',
	support: '/support',
}

export const siteConfig = {
	name: "Blochain Inventory Management System",
	shortName: "BIMS",
	keywords: "BIMS - Blochain Inventory Management System",
	description: "A developer space to accelerate software developement.",
	navItems: [
		{
			label: "Dashboard",
			href: internalUrls.dashboard,
		},
		{
			label: "History",
			href: internalUrls.history,
		},
		{
			label: "Reports",
			href: internalUrls.reports,
		},
		{
			label: "Docs",
			href: internalUrls.docs,
		},
	],

};

export const siteFooter = {
	termsAndConditions: [
		{
			label: "© 2024 Blochain Inventory Management System",
			href: internalUrls.home,
		},
	],

	socialLinks: [
		{
			label: "Terms",
			href: internalUrls.home,
		},
		{
			label: "Privacy",
			href: internalUrls.home,
		},
		{
			label: "Docs",
			href: internalUrls.docs,
		},
	],

	developer: {
		label: "Design & maintained by Genius Tech Space",
		href: internalUrls.home,
	},
}

export const colors = {
	primary: "#f97316",
	primary500: "#f59e0b",
}

