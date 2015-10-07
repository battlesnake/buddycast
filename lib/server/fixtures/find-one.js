var findOneUser = function() {
  return Users.findOne();

};

if (process.env.IS_MIRROR) {
  Meteor.methods({
    'fixtures/find-one/user': findOneUser
  });
}
