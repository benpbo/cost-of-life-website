import Keycloak, { type KeycloakInitOptions } from 'keycloak-js';
import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';

export const ssr = false;
export const load: LayoutLoad = async () => {
  const instance = {
    realm: 'Test',
    url: 'http://localhost:8081',
    clientId: 'cost-of-life',
  };

  const keycloak = new Keycloak(instance);
  const kcInitOpts: KeycloakInitOptions = {
    onLoad: "login-required",
    checkLoginIframe: false,
  };

  try {
    const authenticated = await keycloak.init(kcInitOpts);
    if (!authenticated) {
      await keycloak.login();
    }

    document.cookie = `token=${keycloak.token}; path=/; SameSite=strict`;
    return {
      keycloak,
    };
  }
  catch (e) {
    console.error(e);
    error(500);
  }
};
