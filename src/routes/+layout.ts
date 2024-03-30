import Keycloak from 'keycloak-js';
import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';
import { serialize } from 'cookie'

export const ssr = false;
export const load: LayoutLoad = async () => {
  try {
    const keycloak = new Keycloak();
    function updateCookie() {
      document.cookie = serialize(
        'token',
        keycloak.token ?? '',
        {
          path: '/',
          sameSite: 'strict'
        }
      );
    }

    // Setup callbacks
    keycloak.onAuthRefreshSuccess = updateCookie;
    keycloak.onAuthRefreshError = async () => {
      await keycloak.login();
    };

    keycloak.onTokenExpired = async () => {
      await keycloak.updateToken();
    };

    // Initialize keycloak, require user to login
    await keycloak.init({
      onLoad: "login-required",
    });

    updateCookie();

    return {
      keycloak,
    };
  }
  catch (e) {
    console.error(e);
    error(500);
  }
};
