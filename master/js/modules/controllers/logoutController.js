/**
 * Created by rizamasta on 5/10/15.
 */
App.controller('logoutController', function($state){
    localStorage.clear();
    $state.go('login.user');
});
