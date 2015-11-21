Meteor.methods({

	'user/create': function() {
		return Buddycast.Collections.Users.insert({});
	},

	'user/rank-up': function(userId, buddyId) {
		var user = Buddycast.Collections.Users.findOne({_id: userId});
		var oldIndex = user.buddies.indexOf(buddyId);

		if(oldIndex == -1) {
			Buddycast.Collections.Users.update(
				{_id: userId},
				{$addToSet: {buddies: buddyId}}
			);
		} else if(oldIndex > 0) {
				user.buddies[oldIndex] = user.buddies[oldIndex-1];
				user.buddies[oldIndex-	1] = buddyId;

				Buddycast.Collections.Users.update(
					{_id: userId},
					{$set: {buddies: user.buddies}}
				);
		}
	},

	'user/rank-down': function(userId, buddyId) {
		var user = Buddycast.Collections.Users.findOne({_id: userId});
		var oldIndex = user.buddies.indexOf(buddyId);

		if((oldIndex != -1) && (oldIndex != (user.buddies.length-1))) {
			user.buddies[oldIndex] = user.buddies[oldIndex+1];
			user.buddies[oldIndex+1] = buddyId;

			Buddycast.Collections.Users.update(
				{_id: userId},
				{$set: {buddies: user.buddies}}
			);
		}
	}

})
