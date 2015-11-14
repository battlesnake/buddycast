Tracker.autorun(function() {
	Meteor.subscribe('message', Session.get('userId'));
});

Template.message.helpers({
	message() {
		var message = Buddycast.Collections.Messages.findOne();

		if(message) {
			return message;
		} else {
			return {
				text: 'Loading...'
			};
		};
	}
});
