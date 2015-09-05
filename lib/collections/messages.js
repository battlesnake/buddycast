Messages = new Mongo.Collection('messages');

Meteor.methods({
	messageInsert: function(message) {
		check(message, {
			text: String,
		});

		message = _.extend(message, {
			submitted: new Date()
		});

		console.log(message);

		return Messages.insert(message);
	}
});