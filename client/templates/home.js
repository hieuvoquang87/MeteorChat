/**
 * Created by hieuvo on 5/28/15.
 */

Template.home.events({
    'submit #send-request': function (event) {
        var currentUser = Meteor.user().emails[0].address;
        var recipientName = event.target.friendName.value;
        Meteor.call('sendFriendRequest', currentUser, recipientName);
        event.target.friendName.value = "";
        return false;
    },
    'click .remove-panel': function (event) {
        var chatPanels = Session.get('ChatPanels');
        event.stopHandle = true;
        for (var i = 0; i < chatPanels.length; i++) {
            if (chatPanels[i].name === this.name) {
                chatPanels.splice(i,1);
            }
        }

        Session.set('ChatPanels', chatPanels);
        if(Session.get('currentSelectedPanel').name === this.name) {
            Session.set('currentSelectedPanel', chatPanels[0]);
        }
    },
    'click .select-panel': function (event) {
        if(!event.stopHandle) {
            Session.set('currentSelectedPanel', this);
        }
    }
});

Template.home.helpers({
    friends: function () {
        var userId = Meteor.userId();
        Meteor.subscribe('userData', userId);
        var friends;
        UserPublicData.find({userId: userId}, {sort: {isAccepted: 1}}).map(function (result) {
            friends = result.friends;
            Session.set('friends', friends);
        });
        return friends;
    },
    chatPanels: function () {
        if(Session.get('ChatPanels')) {
            return Session.get('ChatPanels');
        } else {
            Session.set('ChatPanels', []);
            return Session.get('ChatPanels');
        }
    },
    isCurrentSelectedPanel: function () {
        if(Session.get('currentSelectedPanel')) {
            if(this.name === Session.get('currentSelectedPanel').name){
                return true;
            } else {
                return false;
            }
        }
    }
});

Template.friend.events({
    'click .accept-request-btn': function (event) {
        var currentUserName = Meteor.user().emails[0].address;
        var conversationId = this.conversationId;
        Meteor.call('acceptFriendRequest', currentUserName, conversationId);
    },
    'click .on-friend-selected': function (event) {
        var chatPanels = Session.get('ChatPanels');
        Session.set('currentSelectedPanel', this);
        var isExisted = false;
        for (var i = 0; i < chatPanels.length; i++) {
            if (chatPanels[i].name === this.name) {
                isExisted = true;
            }
        }
        if (!isExisted) {
            chatPanels.push(this);
            Session.set('ChatPanels', chatPanels);
        }
    }
});

Template.chatPanel.helpers({
    chatFriend: function () {
        if (Session.get('currentSelectedPanel')) {
            return Session.get('currentSelectedPanel').name;
        }
    },
    messages: function () {
        var conversationId = Session.get('currentSelectedPanel').conversationId;
        Meteor.subscribe('privateMessages', conversationId);
        return Messages.find({conversationId: conversationId}, {sort: {createdAt: 1}});
    }
});

Template.chatPanel.events({
    'submit #message-input': function (event) {
        var message = event.currentTarget.message.value;
        var conversationId = Session.get('currentSelectedPanel').conversationId;
        var currentUserName = Meteor.user().emails[0].address;
        Meteor.call('sendPrivateMessage', currentUserName, conversationId, message);
        event.currentTarget.message.value = "";
        return false;
    }
});