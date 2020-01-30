const proxy = require('http-proxy-middleware');
const Bundler = require('parcel-bundler');
const express = require('express');

const { PORT = 1234 } = process.env;

const devServer = express();

devServer.use(
  '/api',
  proxy({
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: {
      '/api': '',
    }
  }),
);

const bundler = new Bundler('./web/index.html', {
  cache: false,
});

devServer.use(bundler.middleware());

devServer.listen(PORT);