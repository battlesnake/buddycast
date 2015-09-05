Meteor.subscribe('messages');

Template.postMessage.events({
	'submit form': function (e, template) {
		e.preventDefault();

		var $text = $(e.target).find('[name=text]');
		var message = {
			text: $text.val()
		};

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

