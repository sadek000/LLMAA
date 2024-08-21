// config-overrides.js
const webpack = require("webpack");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    https: require.resolve("https-browserify"),
    http: require.resolve("stream-http"),
    fs: require.resolve("browserify-fs"),
    // path: require.resolve("path-browserify"),
    // os: require.resolve("os-browserify/browser"),
    url: require.resolve("url/"),
    stream: require.resolve("stream-browserify"),
  };
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  return config;
};
