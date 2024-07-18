const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;

module.exports = {
  entry: {
    core: './src/layout/core.js',
  },
  output: {
    path: path.resolve(__dirname, './build/js'),
    filename: '[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        resolve: {
          fullySpecified: false,
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  stats: { warnings: false },
  plugins: [
    process.env.MODE === 'production' && new StatoscopeWebpackPlugin({
      compressor: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  mode: process.env.MODE || 'development',
  externals: {
    jquery: 'jQuery',
  },
};
