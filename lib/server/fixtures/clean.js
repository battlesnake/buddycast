var clean = function() {
  Package['xolvio:cleaner'].resetDatabase();
};

if (process.env.IS_MIRROR) {
  Meteor.methods({
    'fixtures/clean': clean
  });
}
