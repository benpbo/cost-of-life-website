import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import KeycloakProvider from '@auth/core/providers/keycloak';
import { AUTH_SECRET, KEYCLOAK_CLIENTSECRET } from '$env/static/private';

const config: SvelteKitAuthConfig = {
  providers: [
    KeycloakProvider(
      {
        clientId: 'cost-of-life',
        clientSecret: KEYCLOAK_CLIENTSECRET,
        wellKnown: 'http://localhost:8081/realms/Test/.well-known/openid-configuration',
        issuer: 'http://localhost:8081/realms/Test'
      })
  ],
  secret: AUTH_SECRET,
  session: {
    maxAge: 1800 // 30 mins
  }
};

export const auth = SvelteKitAuth(config);
