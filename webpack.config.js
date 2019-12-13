const
	path = require('path'),
	webpack = require('webpack'),
	{ GenerateSW } = require('workbox-webpack-plugin'),
	dist = __dirname + '/dist',
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	WebpackPwaManifest = require('webpack-pwa-manifest')
/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

module.exports = {
	mode: 'development',
	entry: './src/index.js',

	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [

		// Service Worker
		new GenerateSW({
			swDest: 'sw.js',
			clientsClaim: true,
			skipWaiting: true,
			importScripts:['push7-worker.js'],
			runtimeCaching: [{
				// Match any same-origin request that contains 'api'.
				urlPattern: '/images/stage/',
				// Apply a network-first strategy.
				handler: 'NetworkFirst',
				options: {
					// Fall back to the cache after 10 seconds.
					networkTimeoutSeconds: 10,
					// Use a custom cache name for this route.
					cacheName: 'my-api-cache',
					// Configure custom cache expiration.
					expiration: {
						maxEntries: 64,
						maxAgeSeconds: 60,
					},
					// Configure background sync.
					backgroundSync: {
						name: 'my-queue-name',
						options: {
							maxRetentionTime: 60 * 60,
						},
					},
					// Configure which responses are considered cacheable.
					cacheableResponse: {
						statuses: [0, 200],
						headers: {'x-test': 'true'},
					},
					// Configure the broadcast update plugin.
					broadcastUpdate: {
						channelName: 'my-update-channel',
					},
					// Add in any additional plugin logic you need.
					// plugins: [
					// 	{cacheDidUpdate: () => /* custom plugin code */}
					// ],
					// matchOptions and fetchOptions are used to configure the handler.
					fetchOptions: {
						mode: 'no-cors',
					},
					matchOptions: {
						ignoreSearch: true,
					},
				},
			}, {
				// To match cross-origin requests, use a RegExp that matches
				// the start of the origin:
				urlPattern:new RegExp('^https://app\.splatoon2\.nintendo\.net/'),
				handler: 'StaleWhileRevalidate',
				options: {
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			}],	

		}),	
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src/index.pug"),
			inject: true,
		}),
		new WebpackPwaManifest({
			name: 'Splatoon2 GachiMatch Stage News',
			short_name: 'SPLA PWA',
			description: 'My awesome Progressive Web App!',
			background_color: '#000',
			display:'fullscreen',
			ios:true,
			ios: {
				'apple-mobile-web-app-title': 'AppTitle',
				'apple-mobile-web-app-status-bar-style': 'black'
			},
			crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
			icons: [
				{
					src: path.resolve('src/images/icons/icon-512x512.png'),
					sizes: [120, 152, 167, 180, 1024],
					destination: path.join('icons', 'ios'),
					ios: true
				},
				{
					src: path.resolve('src/images/icons/icon-512x512.png'),
					size: 1024,
					destination: path.join('icons', 'ios'),
					ios: 'startup'
				},
				{
					src: path.resolve('src/images/icons/icon-512x512.png'),
					sizes: [36, 48, 72, 96, 144, 192, 512],
					destination: path.join('icons', 'android')
				}
			],
			fingerprints: false,
			publicPath:'/',
			start_url:'/',
		}),			
		// new InlineChunkManifestHtmlWebpackPlugin()
	],

	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			},
			{
				test: /\.pug$/,
				use: 'pug-loader',
			},
			{
				test: /\.postcss/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			}			
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	devServer: {
		open: true
	}
};
