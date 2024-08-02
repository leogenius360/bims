"use client"

import { withLoginRequired } from "@/auth/provider";


const TransactionsPage = () => {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<h3>Transactions page</h3>
		</section>
	);
}

export default withLoginRequired(TransactionsPage);
