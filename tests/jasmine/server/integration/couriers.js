describe('Buddycast.Services.Courier', function() {

  beforeAll(function() {
    Meteor.call("fixtures/clean");
    Meteor.call("fixtures/factory");
  });

  it('should always deliver a message', function() {
    expect(Buddycast.Services.Courier.deliver(
      Buddycast.Collections.Users.findOne()._id))
      .not.toBe(undefined);
  });

  it('should deliver the most relevant message', function() {
    Buddycast.Collections.Users.find().forEach(function(user) {
      var message = Buddycast.Collections.Messages
        .findOne({_id: Buddycast.Services.Courier.deliver(user._id)});
      expect(message).not.toBe(undefined);
      expect(message.userId).not.toBe(undefined);
      expect(message.userId).not.toBe(user._id);
    });
  });

});
