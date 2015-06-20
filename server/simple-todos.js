/**
 * Created by hieuvo on 5/29/15.
 */
Meteor.publish('tasks', function () {
    return Tasks.find({
        $or: [
            {private: {$ne: true}},
            {owner: this.userId}
        ]
    });
});