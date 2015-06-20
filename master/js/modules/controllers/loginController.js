/**
 * Created by rizamasta on 5/10/15.
 */
App.controller('loginController',['$rootScope','$state','$scope','$http','urlConfig', function($rootScope,$state,$scope,$http,urlConfig){

    $rootScope.currTitle = $state.current.title;
    $rootScope.pageTitle = function() {
        return $rootScope.app.name + ' - ' + ($rootScope.currTitle);
    };
    $scope.authMsg      = undefined;
    $scope.account       = {};


    $scope.login        = function(){
        var urlData  = encoding_url($scope.account);
        $http({
            method: 'POST',
            url: urlConfig.gatewayUrl('login'),
            data: urlData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){

           $scope.result    = data;

            if($scope.result.message=='success'){
                $scope.authMsg = "";
                localStorage['data_login']  = JSON.stringify($scope.result);
                $state.go('web.dashboard');

            }
            else{
                $scope.authMsg = "Password atau Username salah";
            }

        }).error(function(e){
            $scope.authMsg = "Error "+e;
        });
    };

}]);
