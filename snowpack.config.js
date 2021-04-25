// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	mount: {
		public: '/',
		src: '/src',
	},
	routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
	plugins: [['@snowpack/plugin-sass', { native: true }]],
	packageOptions: {},
	devOptions: {
		/* ... */
	},
	buildOptions: {
		/* ... */
	},
};
