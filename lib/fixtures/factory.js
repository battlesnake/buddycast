Factory.define('user', Users, {});

Factory.define('message', Messages, {
  userId: Factory.get('user'),
  text: Fake.sentence(5)
});

var createUser = function(obj) {
  Factory.create('user', obj);
};

var createMessage = function(obj) {
  Factory.create('message', obj);
};

var factory = function() {
  _.times(10, createUser);

  Users.find().forEach(function(user) {
    while(_.random(100) < 50) {
      createMessage({userId: user._id});
    }
  });

  _.times(5, createMessage);
};

if (process.env.IS_MIRROR) {
  Meteor.methods({
    'fixtures/factory': factory
  });
}
