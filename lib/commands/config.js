var fs = require('fs');
var homedir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var configFile = homedir + '/.jenkins';

function getConfig() {
  var config = {};
  try {
    config = fs.readFileSync(configFile);
    config = JSON.parse(config);
  } catch (e) {}

  return config;
}

var config = {};

config.getConfig = function () {
  return getConfig();
};

config.setConfig = function (options) {
  var config = getConfig();
  var fileBasedOptions = ['cert', 'certPassword'];
  var acceptedOptions = fileBasedOptions.concat(['host', 'strictSSL']);

  acceptedOptions.forEach(function (acceptedOpt) {
    if (options[acceptedOpt] === true) {
      delete config[acceptedOpt];
    } else {
      if (options[acceptedOpt] === 'false') {
        config[acceptedOpt] = false;
      } else {
        config[acceptedOpt] = options[acceptedOpt] || config[acceptedOpt];
      }
    }
  });

  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
};

module.exports = config;
