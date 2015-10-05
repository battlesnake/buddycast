describe('Messages', function() {

  beforeAll(function() {
    Meteor.call("fixtures/clean");
    Meteor.call("fixtures/factory");
  });

  it('should have a unique id', function() {
    Messages.find().forEach(function(message) {
      expect(Messages.find({_id: message._id}).count()).toBe(1);
    });
  });

  it('should have a non-empty text field', function() {
    Messages.find().forEach(function(message) {
      expect(message.text).not.toBe(undefined);
      expect(message.text.length).not.toBe(0);
    });
  });

  it('should be owned by a known user', function() {
    Messages.find().forEach(function(message) {
      expect(Users.findOne({_id: message.userId})).not.toBe(undefined);
    });
  });
});
