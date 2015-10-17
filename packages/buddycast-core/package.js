Package.describe({
  name: 'buddycast:core',
  version: '0.0.0',
  summary: 'Defines the global namespaces and the application configuration.'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.export('Buddycast');
  api.addFiles('buddycast-core.js');
});
