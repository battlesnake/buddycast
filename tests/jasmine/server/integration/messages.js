describe('Buddycast.Collections.Messages', function() {

  beforeAll(function() {
    Meteor.call("fixtures/clean");
    Meteor.call("fixtures/factory");
  });

  it('should have a unique id', function() {
    Buddycast.Collections.Messages.find().forEach(function(message) {
      expect(Buddycast.Collections.Messages
        .find({_id: message._id}).count()).toBe(1);
    });
  });

  it('should have a non-empty text field', function() {
    Buddycast.Collections.Messages.find().forEach(function(message) {
      expect(message.text).not.toBe(undefined);
      expect(message.text.length).not.toBe(0);
    });
  });

  it('should be owned by a known user', function() {
    Buddycast.Collections.Messages.find().forEach(function(message) {
      expect(Buddycast.Collections.Users
        .findOne({_id: message.userId})).not.toBe(undefined);
    });
  });

});
