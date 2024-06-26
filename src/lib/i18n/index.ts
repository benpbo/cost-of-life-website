import { browser } from '$app/environment'
import { init, register } from 'svelte-i18n'

const defaultLocale = 'he';

register('he', () => import('./locales/he.json'));

init({
  fallbackLocale: defaultLocale,
  initialLocale: browser ? window.navigator.language : defaultLocale,
});
