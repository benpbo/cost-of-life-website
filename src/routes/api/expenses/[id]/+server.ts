import { PUBLIC_API_BASE_URL } from "$env/static/public";
import type { RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ params, fetch }) => {
  if (params.id === undefined) {
    return new Response(null, { status: 404 });
  }

  const id = parseInt(params.id);
  const url = new URL(`/expense/sources/${id}`, PUBLIC_API_BASE_URL);
  return await fetch(url, { method: 'DELETE' });
}
