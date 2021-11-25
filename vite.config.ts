import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import legacy from '@vitejs/plugin-legacy';
import TsChecker from 'vite-plugin-ts-checker';
// https://vitejs.dev/config/
export default defineConfig({
	server: {
		hmr: {
			overlay: true,
		},
	},
	plugins: [
		reactRefresh(),
		TsChecker(),
		legacy({
			targets: ['defaults'],
		}),
	],
});
