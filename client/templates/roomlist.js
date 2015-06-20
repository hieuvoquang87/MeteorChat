/**
 * Created by hieuvo on 5/27/15.
 */

Template.roomList.events({
    'submit #create-room': function (event) {
        var roomName = event.target.roomName.value;
        var creatorId = Meteor.user()._id;
        Rooms.createRoom(roomName, creatorId);
        event.target.roomName.value = "";
        return false;
    }
});

Template.roomList.helpers({
    rooms: function () {
        Meteor.subscribe('allRooms');
        var rooms = Rooms.find({}, {sort: {createdAt: -1}});
        return rooms;
    },
    userInRoom: function () {
        Meteor.subscribe('roomUsers', this._id);
        return RoomUsers.find({room: this._id}).count();
    }
});