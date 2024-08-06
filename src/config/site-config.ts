export type SiteConfig = typeof siteConfig;

export const internalUrls = {
	// Base URL
	home: '/',

	// Auth URLs
	auth: "/accounts",
	login: "/accounts/login",
	signUp: "/accounts/signup",
	forgotPassword: "/accounts/forgot-password",

	// Navigation URLs
	dashboard: '/dashboard',
	transactions: '/transactions',
	history: '/history',
	reports: '/reports',
	docs: '/docs',
	support: '/support',

	// Access Control
	accessDenied: '/access-denied',
}

export const requireAuth = [
	internalUrls.dashboard,
	internalUrls.transactions,
	internalUrls.reports,
	internalUrls.history
]

export const siteConfig = {
	name: "Blochain Inventory Management System",
	shortName: "BIMS",
	keywords: "BIMS - Blochain Inventory Management System",
	description: "A developer space to accelerate software developement.",
	navItems: [
		{
			label: "Home",
			href: internalUrls.home,
		},
		{
			label: "Dashboard",
			href: internalUrls.dashboard,
		},
		{
			label: "Transactions",
			href: internalUrls.transactions,
		},
		// {
		// 	label: "History",
		// 	href: internalUrls.history,
		// },
		// {
		// 	label: "Reports",
		// 	href: internalUrls.reports,
		// },
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

export const admins = [
	"admin36@bims.com"
]

export const sales = [
	"sales123@bims.com"
]

export const delivery = [
	"delivery45@bims.com"
]

export const allowedUsers = {
	admins: admins,
	sales: [...admins, ...sales],
	delivery: [...admins, ...sales, ...delivery]
}


export const support = {
	phone: "tel:+233241301463",
	whatsapp: "https://wa.me/233241301463",
	mail: "support24@bims.com"
}

