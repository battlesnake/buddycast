Users = new Mongo.Collection('users');

Meteor.methods({
    userInsert: function() {
        var user = {};

        return Users.insert(user);
    }
});