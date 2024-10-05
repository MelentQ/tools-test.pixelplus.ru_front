import { resolve } from 'path';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import StatoscopeWebpackPlugin from '@statoscope/webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';

export default {
  output: {
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
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
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
    process.env.NODE_ENV === 'production' && new StatoscopeWebpackPlugin.default({
      compressor: false,
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  mode: process.env.NODE_ENV || 'development',
  externals: {
    jquery: 'jQuery',
  },
};
