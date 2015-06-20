App.controller('authController',['$state', function($state){
   // console.log("log"+localStorage['login']);

        try{
            JSON.parse(localStorage['data_login']);
        }
    catch (err) {
        localStorage.clear();
        $state.go('login.user');
    }

}]);