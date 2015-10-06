Meteor.methods({

	'user-service/create': function() {
		return Users.insert({});
	}

})
