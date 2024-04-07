import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { Handle, HandleFetch } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';

export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
  if (request.url.startsWith(PUBLIC_API_BASE_URL)) {
    request.headers.append('Authorization', `Bearer ${event.cookies.get('token')}`);
  }

  return await fetch(request);
}

export const handle: Handle = async ({ event, resolve }) => {
  const lang = event.request.headers.get('accept-language')?.split(',')[0];
  if (lang) {
    locale.set(lang);
  }

  return resolve(event);
};
