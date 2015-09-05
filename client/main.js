Meteor.subscribe('messages');

if(typeof Session.get('userId') === 'undefined') {
	Meteor.call('userInsert', function(err, userId) {
		Session.setPersistent('userId', userId)
	});
}

Template.postMessage.events({
	'submit form': function (e, template) {
		e.preventDefault();

		var $text = $(e.target).find('[name=text]');
		var message = {
			userId: Session.get('userId'),
			text: $text.val()
		};

		console.log('UserId: ', Session.get('userId'))

		Meteor.call('messageInsert', message);
	}
});


Template.showMessages.helpers({
	'messages': function() {
		var messages = Messages.find({});
		console.log(messages)
		return messages;
	}
})



