module.exports = {
  apps : [{
    name: 'growlightsdev',
		script: 'quasar',
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'dev',
    instances: 1,
    autorestart: true,
		watch: true,
    max_memory_restart: '1G',
    env: {
			api: 'dev',
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
