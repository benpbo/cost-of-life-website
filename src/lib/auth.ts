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

export interface User {
  username?: string
}

export interface Session {
  getUser(): User
  isAuthenticated(): boolean
  logout(): Promise<void>
}

class KeycloakSession {
  keycloak: Keycloak

  constructor(keycloak: Keycloak) {
    this.keycloak = keycloak;
  }

  getUser(): User {
    return {
      username: this.keycloak.tokenParsed?.preferred_username
    }
  }

  isAuthenticated(): boolean {
    return this.keycloak.authenticated ?? false;
  }

  async logout(): Promise<void> {
    await this.keycloak.logout();
  }
}

export async function createSession(): Promise<Session> {
  const keycloak = new KeycloakWithRefresh();
  await keycloak.init({
    onLoad: "login-required",
  });

  const session = new KeycloakSession(keycloak);
  return session;
};
