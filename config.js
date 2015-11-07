var config = {
  development: {
    server: {
      port: 3000
    }
  },
  production: {
    server: {
      port: 80
    }
  }
};

module.exports = config[process.env.NODE_ENV] || config.development;
