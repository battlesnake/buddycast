Buddycast.Utils.createUser = function(obj) {
  Factory.create('user', obj);
};

Buddycast.Utils.createMessage = function(obj) {
  Factory.create('message', obj);
};

Buddycast.Utils.factory = function() {
  Factory.define('user', Buddycast.Collections.Users, {});

  Factory.define('message', Buddycast.Collections.Messages, {
    userId: Factory.get('user'),
    text: Fake.sentence(5)
  });

  _.times(10, Buddycast.Utils.createUser);

  Buddycast.Collections.Users.find().forEach(function(user) {
    while(_.random(100) < 50) {
      Buddycast.Utils.createMessage({userId: user._id});
    }
  });

  _.times(5, Buddycast.Utils.createMessage);
};
