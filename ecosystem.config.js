module.exports = {
  apps : [{
    name: 'growtime',
		script: 'npx',
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: [
      'quasar',
      'dev',
      // '-m',
      // 'pwa',
    ],
    instances: 1,
    autorestart: true,
		watch: false,
    max_memory_restart: '1G',
    env: {
      level: 'dev',
      apiSubdomain: 'api',
      apiDomain: 'growtime',
      apiTLD: 'src',
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
