const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
  // Loại bỏ ModuleScopePlugin (plugin ngăn import từ bên ngoài src/)
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => !(plugin instanceof ModuleScopePlugin)
  );
  return config;
};