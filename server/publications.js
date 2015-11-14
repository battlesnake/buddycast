Meteor.publish('message', function(userId) {
	if(Match.test(userId, String)) {
		var	content = Buddycast.Collections.Messages
			.find({_id: Buddycast.Services.Courier.deliver(userId)});

		if (content) {
			return content;
		}
	};

	return this.ready();
});
