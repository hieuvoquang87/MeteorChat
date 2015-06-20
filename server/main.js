/**
 * Created by hieuvo on 5/28/15.
 */
Accounts.onCreateUser(function (options, user) {
    var username = user.emails[0].address;
    UserPublicData.insert({username: username, userId: user._id});
    return user;
});