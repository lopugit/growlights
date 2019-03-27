module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'growlightsDev',
      script    : 'app.js',
      watch	: ['app.js', 'models', 'routes', 'scripts'],
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
//,

    // Second application
//    {
//      name      : 'WEB',
//      script    : 'web.js'
//    }
  ]
};
