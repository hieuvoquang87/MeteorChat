/**
 * Created by hieuvo on 5/27/15.
 */
Rooms = new Mongo.Collection('rooms');

Rooms.allow({
    'insert': function () {
        return true;
    }
});

Rooms.createRoom = function (roomName, creatorId) {
    Rooms.insert({name: roomName, creatorId: creatorId, createdAt: new Date(), isPublic: true});
}
Rooms.createPrivateRoom = function (roomName, recipientName, resultFcn) {

}

