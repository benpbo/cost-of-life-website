import { serialize } from 'cookie';
import Keycloak, { type KeycloakInitOptions } from 'keycloak-js';

class KeycloakWithRefresh extends Keycloak {
  async init(initOptions: KeycloakInitOptions): Promise<boolean> {
    const success = await super.init(initOptions);
    this.updateCookie();

    return success;
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
