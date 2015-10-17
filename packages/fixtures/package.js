Package.describe({
  name: 'buddycast:fixtures',
  version: '0.0.1',
  summary: 'Publishes convenience methods to populate database for testing',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('dburles:factory');
  api.use('anti:fake');

  api.addFiles('clean.js', 'server');
  api.addFiles('factory.js', 'server');
  api.addFiles('find-one.js', 'server');
  api.addFiles('fixtures.js', 'server');
});
