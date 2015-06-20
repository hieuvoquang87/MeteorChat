/**
 * Created by hieuvo on 5/28/15.
 */
Accounts.onLogin(function () {
    Session.set('ChatPanels', null);
    Session.set('currentSelectedPanel', null);
});
