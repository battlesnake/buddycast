Messages = new Mongo.Collection('messages');

Meteor.methods({
	messageInsert: function(message) {
		check(message, {
			text: String,
            userId: String
		});

		message = _.extend(message, {
			submitted: new Date(),
            trustCount: 0,
            timeout: 7
		});

		return Messages.insert(message);
	}
});