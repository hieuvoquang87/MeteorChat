/**
 * Created by hieuvo on 5/28/15.
 */


Template.room.helpers({
    currentUser: function () {
        return Meteor.user().emails[0].address;
    },
    messages: function () {
        Meteor.subscribe('roomMessages', this.roomId);
        return Messages.find({room: this.roomId}, {sort: {createdAt: 1}});
    },
    roomusers: function () {
        Meteor.subscribe('roomUsers', this.roomId);
        return RoomUsers.find({room: this.roomId});
    }
});

Template.room.events({
    'submit #add-message': function (event){
        var message = event.target.message.value;
        var roomId = Session.get('roomId');
        Meteor.call('sendRoomMessage', message, roomId);

        event.target.message.value = "";
        return false;
    }
});