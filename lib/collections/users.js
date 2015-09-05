Users = new Mongo.Collection('users');

Meteor.methods({
	userInsert: function() {
		var message = Messages.findOne();

		var user = {
			currentMessage: {
				'messageId': message._id,
				'userId': message.userId,
				'text': message.text
			},
			trust: []
		};

		return Users.insert(user);
	},

	userTrusts: function (userId, yes) {
		var user = Users.findOne({ _id: userId });
		var trust = yes ? {'trust.$.yes': 1} : {'trust.$.no': 1};

		Users.update(
			{_id: userId, 'trust.userId': {$ne: user.currentMessage.userId}}, 
			{$push: {'trust': {'userId': user.currentMessage.userId, 'yes': 0, 'no': 0}}});

		Users.update(
			{_id: userId, 'trust.userId': user.currentMessage.userId},
			{$inc: trust});

		Meteor.call('messageReadByUser', user.currentMessage.messageId, userId);
		Meteor.call('updateMessage', userId);

	},

	updateMessage: function (userId) {

		var user = Users.findOne({ _id: userId });
		var messages = Messages.find({'readBy.userId': {$ne: userId}}, {sort: ['submitted', 'desc']});

		console.log(messages.fetch())

		messages.forEach(function(message) {

			var trust = _.findWhere(user.trust, {userId: message.userId});

			var yesRelative;
			if (!trust || (trust.yes + trust.no) === 0) {
				yesRelative = 0.5;
			} else {
				yesRelative = trust.yes/(trust.yes + trust.no);
			}

			if ((Math.random()*1.1-0.1) < yesRelative ) {
				user.currentMessage.messageId = message._id;
				user.currentMessage.userId = message.userId;
				user.currentMessage.text = message.text;
				return false;
			}

		});

		Users.update({_id: user._id}, user);
	}
});