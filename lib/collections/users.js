Users = new Mongo.Collection('users');

Meteor.methods({
	userInsert: function() {
		var user = {
			currentMessage: Messages.findOne(),
			trust: []
		};
		return Users.insert(user);
	},

	userTrusts: function (userId, yes) {
		console.log('start userTrusts')

		var user = Users.findOne({ _id: userId });

		var trust = yes ? {'trust.$.yes': 1} : {'trust.$.no': 1};

		console.log('userTrusts', trust)

		Users.update(
			{_id: userId, 'trust.userId': {$ne: user.currentMessage.userId}}, 
			{$push: {'trust': {'userId': user.currentMessage.userId, 'yes': 0, 'no': 0}}});

		Users.update(
			{_id: userId, 'trust.userId': user.currentMessage.userId},
			{$inc: trust});
	}
});