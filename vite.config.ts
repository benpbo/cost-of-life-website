import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type PluginOption } from 'vite';

function jsonHotReload(): PluginOption {
  return {
    name: 'json-hot-reload',
    async handleHotUpdate({ file, server }) {
      const srcDirectory = __dirname + '/src/';
      if (file.startsWith(srcDirectory) && file.endsWith('.json')) {
        await server.restart();
      }
    },
  }
}

export default defineConfig({
  plugins: [sveltekit(), jsonHotReload()]
});
