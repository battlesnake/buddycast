Users = new Mongo.Collection('users');

Meteor.methods({
	userInsert: function() {
        var message = Messages.findOne();

        var user = {
			currentMessage: {
                'id': message._id,
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


	},

    updateMessage: function (userId) {

        var user = Users.findOne({ _id: userId });
        var messageCursor = Messages.find().sort ( {submitted: -1 } );

        while (messageCursor.hasNext()) {
            var message = messageCursor.next ();

            var trust = _.findWhere(user.trust, {userId: message.userId});

            var yesRelative;
            if (!trust || (trust.yes + trust.no) === 0) {
                yesRelative = 0.5;
            } else {
                yesRelative = trust.yes/(trust.yes + trust.no);
            }

            if ((Math.random()*1.1-0.1) < yesRelative ) {
                user.currentMessage.id = message.id;
                user.currentMessage.text = message.text;
                break;
            }

        }

        Users.update(user);
    }
});