const { overrideDevServer } = require('customize-cra');

const addSetupMiddlewares = () => (config) => {
  if (!config) {
    config = {};
  }

  config.setupMiddlewares = (middlewares, devServer) => {
    // Your middleware setup code before other middlewares
    console.log('Custom middleware setup before');
    return middlewares;
  };

  return config;
};

module.exports = {
  webpack: (config, env) => config, // Just return the config for webpack overrides (if any)
  devServer: overrideDevServer(addSetupMiddlewares())
};
