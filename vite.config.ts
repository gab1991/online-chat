import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import TsChecker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: { '@': resolve(__dirname, 'src') },
	},
	server: {
		hmr: {
			overlay: true,
		},
	},
	css: {
		modules: {
			generateScopedName: '[name]_[local]_[hash:base64:5]',
		},
		preprocessorOptions: {
			scss: {
				additionalData(source, fp) {
					// prevents import vars files to itself
					if (fp.endsWith('vars.module.scss')) return source;
					// prepend new line import plus original content
					return `@import "@/vars.module.scss";${source}`;
				},
				charset: false,
			},
		},
	},
	plugins: [tsconfigPaths(), reactPlugin(), TsChecker({ typescript: true, enableBuild: true })],
});
