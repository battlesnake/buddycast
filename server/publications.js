Meteor.publish('userById', function(userId) {
    return Users.find({ _id: userId });
})