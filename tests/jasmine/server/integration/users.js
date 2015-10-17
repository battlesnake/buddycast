describe('Buddycast.Collections.Users', function() {

  beforeAll(function() {
    Meteor.call("fixtures/clean");
    Meteor.call("fixtures/factory");
  });

  it('should have a unique id', function() {
    Buddycast.Collections.Users.find().forEach(function(user) {
      expect(Buddycast.Collections.Users.find({_id: user._id}).count()).toBe(1);
    });
  });

  it('should create with unique id', function () {
    Meteor.call('user/create', function(err, userId) {
      expect(Buddycast.Collections.Users.find({_id: userId}).count()).toBe(1);
    });
  });

});
