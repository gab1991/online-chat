import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import TsChecker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		hmr: {
			overlay: true,
		},
	},
	plugins: [reactPlugin(), TsChecker({ typescript: true })],
});
