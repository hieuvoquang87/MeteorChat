/**
 * Created by hieuvo on 5/27/15.
 */
RoomUsers = new Mongo.Collection('roomusers');

RoomUsers.allow({
    'insert': function () {
        return true;
    },
    'remove': function () {
        return true;
    },
    'update': function () {
        return true;
    }
});

Meteor.methods({
    joinRoom: function (userId, username, roomId) {
        RoomUsers.remove({userId: userId}, function (err) {
            if (!err) {
                var userRoomId = RoomUsers.insert({
                    userId: userId,
                    user: username,
                    room: roomId
                });
                if(Meteor.isClient) {
                    Session.set('userRoomId', userRoomId);
                }
            }
        });
    }
});
