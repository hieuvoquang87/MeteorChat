/**
 * Created by hieuvo on 5/29/15.
 */
Meteor.subscribe('tasks');
Template.simpleTodos.helpers({
    tasks: function () {
        if(Session.get('hideCompleted')) {
            return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
        } else {
            return Tasks.find({}, {sort: {createdAt: -1}});
        }
    },
    hideCompleted: function () {
        return Session.get('hideCompleted');
    },
    incompleteCount: function () {
        return Tasks.find({checked: {$ne: true}}).count();
    }
});
Template.task.helpers({
    isOwner: function () {
        return this.owner === Meteor.userId();
    }
});

Template.simpleTodos.events({
    "submit .new-task": function (event) {
        var text = event.target.text.value;
        Meteor.call('addTask', text);
        event.target.text.value = "";
        return false;
    },
    "click .toggle-checked": function () {
        Meteor.call('setChecked', this._id, this.checked);
    },
    "click .delete": function () {
        Meteor.call('deleteTask', this._id);
    },
    "change .hide-completed input": function (event) {
        Session.set('hideCompleted', event.target.checked);
    },
    "click .toggle-private": function () {
        Meteor.call('setPrivate', this._id, ! this.private);
    }
});
