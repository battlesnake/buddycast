Meteor.methods({

	'user/create': function() {
		return Buddycast.Collections.Users.insert({});
	}

})
