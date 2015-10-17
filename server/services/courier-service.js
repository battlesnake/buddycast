Buddycast.Services.Courier = {

  deliver: function(userId) {
    return Buddycast.Collections.Messages.findOne({userId: {$ne: userId}})._id;
  }

};
