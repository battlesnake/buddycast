Messages = new Mongo.Collection('messages');

Meteor.methods({
	messageInsert: function(message) {
		check(message, {
			text: String
		});

		message = _.extend(message, {
			submitted: new Date(),
            userId: 0,
            trustCount: 0,
            timeout: 7
		});

		return Messages.insert(message);
	}
});