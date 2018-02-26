const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config')('development');

const app = express();
const compiler = webpack(webpackConfig);
const port = 8080;

app.use(webpackDevMiddleware(compiler));

app.get('/soulEdit', (req, res) => {
  res.send({
    status: 200,
    message: '成功'
  });
});

app.listen(port, () => {
  console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
