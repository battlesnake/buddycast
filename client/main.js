if(typeof Session.get('userId') === 'undefined') {
	Meteor.call('user-service/create', function(err, userId) {
		Session.setPersistent('userId', userId)
	});
}

/*if(typeof Session.get('userId') === 'undefined') {
	Meteor.call('userInsert', function(err, userId) {
		Session.setPersistent('userId', userId)
		Meteor.subscribe('userById', Session.get('userId'));
	});
} else {
	Meteor.subscribe('userById', Session.get('userId'));
}

// postMessage events
Template.postMessage.events({
	'submit form': function (e, template) {
		e.preventDefault();

		var $text = $(e.target).find('[name=text]');
		var message = {
			userId: Session.get('userId'),
			text: $text.val()
		};

		console.log('UserId: ', Session.get('userId'))

		if(message.text.length > 0) {

			Meteor.call('messageInsert', message, function(error) {
				if (error) {
					throwError(error.reason)
				} else {
					$text.val('');
				}
			});

		}
	}
});

// showMessage helpers and events
Template.showMessage.helpers({
	'message': function() {
		var user = Users.findOne();
		return user ? user.currentMessage.text : '';
	}
});
Template.showMessage.events({
	'click #yesBtn': function() {
		console.log('yesBtn')
		Meteor.call('userTrusts', Session.get('userId'), true);
	},
	'click #noBtn': function() {
		Meteor.call('userTrusts', Session.get('userId'), false);
	}
});
*/
