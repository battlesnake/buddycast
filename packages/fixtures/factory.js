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

  _.times(5, Buddycast.Utils.createMessage);

  var users = Buddycast.Collections.Users.find().fetch();
  users.forEach(function(user) {
    while(_.random(100) < 50) {
      Buddycast.Utils.createMessage({userId: user._id});
    }

    _.times(2, function() {
      Meteor.call('user/rank-up', user._id,
        (users[_.random(users.length-1)])._id);
    });

    while(_.random(100) < 50) {
      Meteor.call('user/rank-up', user._id,
        (users[_.random(users.length-1)])._id);
    }
  });

};
