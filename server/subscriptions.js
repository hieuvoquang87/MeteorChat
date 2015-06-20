/**
 * Created by hieuvo on 5/27/15.
 */
Meteor.publish('allRooms', function () {
    return Rooms.find({isPublic: true});
});

Meteor.publish('roomMessages', function (roomId) {
    return Messages.find({room: roomId});
});

Meteor.publish('roomUsers', function (roomId) {
    return RoomUsers.find({room: roomId});
});

Meteor.publish('userData', function (userId) {
    return UserPublicData.find({userId: userId});
});

Meteor.publish('privateMessages',function (conversationId) {
    return Messages.find({conversationId: conversationId});
});
