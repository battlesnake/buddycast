Meteor.publish('userById', function(userId) {
	console.log('userById', userId)
	return Users.find({ _id: userId });
});