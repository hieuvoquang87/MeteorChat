/**
 * Created by hieuvo on 5/27/15.
 */
Messages = new Mongo.Collection('messages');

Messages.allow({
    'insert': function () {
        return true;
    }
});

Meteor.methods({
    sendRoomMessage: function (message, roomId) {
        var senderName = Meteor.user().emails[0].address;
        Messages.insert({sender: senderName, content: message, room: roomId, createdAt: new Date()}, function (err){
            if(err) {
                alert('Cannot send message');
            }
        });
    }
});
