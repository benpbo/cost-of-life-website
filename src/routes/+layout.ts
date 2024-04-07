import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment'
import { createSession } from '$lib/auth';

export const load: LayoutLoad = async () => {
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
