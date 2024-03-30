import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
  if (request.url.startsWith(PUBLIC_API_BASE_URL)) {
    request.headers.append('Authorization', `Bearer ${event.cookies.get('token')}`);
  }

  return await fetch(request);
};
