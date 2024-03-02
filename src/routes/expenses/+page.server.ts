import { ExpenseSource } from '$lib/domain';
import type { PageServerLoad, Actions } from './$types';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();

    const body = {
      name: data.get('name'),
      expense: {
        period: {
          kind: data.get('period-kind'),
          every: parseInt(data.get('period-every') as string),
        },
        amount: parseInt(data.get('amount') as string),
      }
    };

    const url = new URL('/expense/sources', PUBLIC_API_BASE_URL);
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} satisfies Actions;

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
