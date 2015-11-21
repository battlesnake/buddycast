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

  it('should create with unique id', function() {
    Meteor.call('user/create', function(err, userId) {
      expect(Buddycast.Collections.Users.find({_id: userId}).count()).toBe(1);
    });
  });

  describe('Ranking', function() {

    it('should append new buddy to list of buddies on rank up', function() {
      var user = Buddycast.Collections.Users.findOne();
      var buddyId = Buddycast.Collections.Users.
        findOne({_id: {$nin: user.buddies}})._id;

      expect(user.buddies).not.toContain(buddyId);

      Meteor.call('user/rank-up', user._id, buddyId);

      var updatedUser = Buddycast.Collections.Users.findOne({_id: user._id});

      expect(updatedUser.buddies.length).toBe(user.buddies.length+1);
      expect(updatedUser.buddies[updatedUser.buddies.length-1]).toBe(buddyId);
    });

    it('should rank up existing buddy', function() {
      var user = Buddycast.Collections.Users.findOne();
      var buddyId = user.buddies[user.buddies.length-1]
      if(user.buddies.length < 2) {
        buddyId = Buddycast.Collections.Users.
          findOne({_id: {$nin: user.buddies}})._id;

        Meteor.call('user/rank-up', user._id, buddyId);
      }

      Meteor.call('user/rank-up', user._id, buddyId);

      var updatedUser = Buddycast.Collections.Users.findOne({_id: user._id});

      expect(updatedUser.buddies[updatedUser.buddies.length-1])
        .not.toBe(buddyId);
      expect(updatedUser.buddies[updatedUser.buddies.length-2])
        .toBe(buddyId);
    });

    it('should rank down existing buddy', function() {
      var user = Buddycast.Collections.Users.findOne();
      var buddyId = user.buddies[0]
      if(user.buddies.length < 2) {
        var otherBuddyId = Buddycast.Collections.Users.
          findOne({_id: {$nin: user.buddies}})._id;

        Meteor.call('user/rank-up', user._id, otherBuddyId);
      }

      Meteor.call('user/rank-down', user._id, buddyId);

      var updatedUser = Buddycast.Collections.Users.findOne({_id: user._id});

      expect(updatedUser.buddies[0]).not.toBe(buddyId);
      expect(updatedUser.buddies[1]).toBe(buddyId);
    });

    it('should ignore non existing buddy on rank down', function() {
      var user = Buddycast.Collections.Users.findOne();
      var nonBuddyId = Buddycast.Collections.Users.
        findOne({_id: {$nin: user.buddies}})._id;

      Meteor.call('user/rank-down', user._id, nonBuddyId);

      var updatedUser = Buddycast.Collections.Users.findOne({_id: user._id});

      expect(updatedUser).toEqual(user);
    });

  });

});
