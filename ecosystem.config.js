module.exports = {
  apps : [{
    name: 'dev-growtime',
		script: 'npx quasar dev',
    instances: 1,
    autorestart: true,
		watch: false,
    max_memory_restart: '1G'
  }]
};
