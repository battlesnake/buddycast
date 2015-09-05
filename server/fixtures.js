var message = {
	userId: 'GOD',
	text: "First message ever created."
};

Meteor.call('messageInsert', message);

Meteor.call('userInsert', function(err, userId) {

	var message = {
		userId: userId,
		text: "We are awesome! " + Math.random()
	};

	Meteor.call('messageInsert', message);

});

Meteor.call('userInsert', function(err, userId) {

	var message = {
		userId: userId,
		text: "OMG I like this soooo much! " + Math.random()
	};

	Meteor.call('messageInsert', message);

});

Meteor.call('userInsert', function(err, userId) {

	var message = {
		userId: userId,
		text: "Shut up. " + Math.random()
	};

	Meteor.call('messageInsert', message);

});



