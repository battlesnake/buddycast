Users = new Mongo.Collection('users');

Meteor.methods({
    userInsert: function() {
        var user = {
            currentMessage: Messages.findOne(),
            trust: []
        };
        return Users.insert(user);
    },

    userTrusts: function (userId) {
        var user = Users.findOne({ _id: userId })

        user.
    }
});