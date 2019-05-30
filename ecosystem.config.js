module.exports = {
  apps : [{
    name: 'growlights',
		script: 'quasar',
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: [
      'dev',
      '-m',
      'pwa',
    ],
    instances: 1,
    autorestart: true,
		watch: false,
    max_memory_restart: '1G',
    env: {
      level: 'dev',
      apiSubdomain: 'api',
      apiDomain: 'growlights',
      apiTLD: 'src',
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
