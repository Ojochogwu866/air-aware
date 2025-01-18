const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api/openaq',
		createProxyMiddleware({
			target: 'https://api.openaq.org',
			changeOrigin: true,
		})
	);
};
