/**
 * Created by hieuvo on 5/28/15.
 */
Meteor.methods({
    sendPrivateMessage: function (currentUserName, conversationId, message) {
        Messages.insert({
            conversationId: conversationId,
            sender: currentUserName,
            content: message,
            createdAt: new Date()
        });
    },
    sendFriendRequest: function (currentUserName, recipientName) {
        var request = UserPublicData.find({$and: [{"friends.name":recipientName},{username: currentUserName}]});
        if(request.fetch().length === 0 && currentUserName !== recipientName) {
            var uid = Date.now();
            UserPublicData.update({username: recipientName}, {
                $addToSet: {
                    friends: {
                        name: currentUserName,
                        conversationId: uid,
                        isAccepted: false
                    }
                }
            });
            UserPublicData.update({username: currentUserName}, {
                $addToSet: {
                    friends: {
                        name: recipientName,
                        conversationId: uid,
                        isAccepted: true
                    }
                }
            })
        }
    },
    acceptFriendRequest: function (currentUserName, conversationId) {
        UserPublicData.update(
            {$and: [{"friends.conversationId":conversationId},{username: currentUserName}]},
            {$set: {"friends.$.isAccepted": true}}
        );
    },
    rejectFriendRequest: function () {}
})