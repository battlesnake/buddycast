describe('Users', function() {

  beforeAll(function() {
    Meteor.call("fixtures/clean");
    Meteor.call("fixtures/factory");
  });

  it('should have a unique id', function() {
    Users.find().forEach(function(user) {
      expect(Users.find({_id: user._id}).count()).toBe(1);
    });
  });
  
});
