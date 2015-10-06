Messages = new Mongo.Collection('messages');

Messages.attachSchema(new SimpleSchema({
    text: {
      type: String,
      max: 500
    },
		userId: {
			type: String
		}
}));

/*Meteor.methods({
	messageInsert: function(message) {
		check(message, {
			text: String,
			userId: String
		});

		message = _.extend(message, {
			submitted: new Date(),
			timeout: new Date(),
			trustCount: 0,
			readBy: []
		});
		message.timeout.setDate(message.submitted.getDate() + 7);

		return Messages.insert(message);
	},

	messageReadByUser: function(messageId, userId) {
		console.log('messageReadByUser')
		console.log(messageId)
		console.log(userId)
		check(messageId, String);
		check(userId, String);

		Messages.update(
			{_id: messageId, 'readBy.userId': {$ne: userId}},
			{$push: {'readBy': {'userId': userId }}});
	}
});*/
