/**
 * Created by hieuvo on 5/27/15.
 */
Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'home',/*
    loadingTemplate: 'loading'*/
});

Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'home',
        redirectOnLogin: true
    });

    this.route('loginRedirectRoute', {
        action: function () {
            router.go('/rooms');
        }
    });

    this.route('room', {
        path: '/room/:_id',
        template: 'room',
        loginRequired: 'home',
        data: function () {
            return {
                roomId: this.params._id
            };
        },
        action: function () {
            var self = this;
            Session.set('roomId', this.params._id);
            var username = Meteor.user().emails[0].address;
            var roomId = this.params._id;
            var userId = Meteor.userId();
            Meteor.call('joinRoom', userId, username, roomId);
            this.render();
        },
        unload: function () {
            var roomUserId = Session.get('userRoomId');
            RoomUsers.remove({_id: roomUserId});
            Session.set('roomId', null);
        }
    });

    this.route('rooms', {
        path: '/rooms',
        template: 'roomList',
        loginRequired: 'home',
        action: function () {
            var username = Meteor.user().emails[0].address;
            Session.set('userName', username);
            this.render();
        },
        data: function () {

        }
    });

    this.route('todos', {
        path: '/todos',
        template: 'simpleTodos'
    })
});