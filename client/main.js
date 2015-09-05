Template.postMessage.helpers({

});

Template.postMessage.events({
	'submit form': function (e, template) {
		e.preventDefault();

		var $text = $(e.target).find('[name=text]');
		var message = {
			text: $text.val()
		};

		console.log(message)

		Meteor.call('messageInsert', message);
	}
});

