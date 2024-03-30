import { serialize } from 'cookie';
import Keycloak from 'keycloak-js';

class KeycloakWithRefresh extends Keycloak {
  onReady(authenticated?: boolean | undefined): void {
    if (authenticated) {
      this.updateCookie();
    }
  }

  async onTokenExpired(): Promise<void> {
    await this.updateToken();
  }

  onAuthRefreshSuccess(): void {
    this.updateCookie();
  }

  async onAuthRefreshError(): Promise<void> {
    await this.login();
  }

  updateCookie() {
    document.cookie = serialize(
      'token',
      this.token ?? '',
      {
        path: '/',
        sameSite: 'strict'
      }
    );
  };
}

export default async () => {
  const keycloak = new KeycloakWithRefresh();
  await keycloak.init({
    onLoad: "login-required",
  });

  return keycloak;
};
