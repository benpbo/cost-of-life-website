import '$lib/i18n'
import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment'
import { createSession } from '$lib/auth';
import { locale, waitLocale } from 'svelte-i18n'

export const load: LayoutLoad = async () => {
  if (browser) {
    locale.set(window.navigator.language)
  }

  await waitLocale()

  try {
    const session = browser ? await createSession() : undefined;
    return {
      session
    };
  }
  catch (e) {
    console.error(e);
    error(500);
  }
};
