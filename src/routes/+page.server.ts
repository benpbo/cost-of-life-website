import { type ExpenseSource } from '$lib/domain';
import type { PageServerLoad } from './$types';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

export const load: PageServerLoad = async (): Promise<{ expenseSources: ExpenseSource[] }> => {
	return {
		expenseSources: await getAllExpenseSources()
	};
};

async function getAllExpenseSources(): Promise<ExpenseSource[]> {
	let url = new URL('/expense/sources', PUBLIC_API_BASE_URL);
	let response = await fetch(url);
	return await response.json();
}
