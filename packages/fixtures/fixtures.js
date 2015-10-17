if (process.env.IS_MIRROR) {
  Meteor.methods({
    'fixtures/clean': Buddycast.Utils.clean,
    'fixtures/factory': Buddycast.Utils.factory,
    'fixtures/find-one-user': Buddycast.Utils.findOneUser
  });
}
