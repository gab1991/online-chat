import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import TsChecker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		hmr: {
			overlay: true,
		},
	},
	css: {
		modules: {
			generateScopedName: '[name]_[local]_[hash:base64:5]',
		},
	},
	plugins: [tsconfigPaths(), reactPlugin(), TsChecker({ typescript: true })],
});
