import setupKeycloak from '$lib/auth';
import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';

export const ssr = false;
export const load: LayoutLoad = async () => {
  try {
    return {
      keycloak: await setupKeycloak(),
    };
  }
  catch (e) {
    console.error(e);
    error(500);
  }
};
