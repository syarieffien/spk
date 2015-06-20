/**
 * Created by rizamasta on 6/20/15.
 */
App.controller('reportDetailController',function($state,$http,$scope,urlConfig,$stateParams){
    var dataUser;

    try{
       dataUser = JSON.parse(localStorage['data_login']);
       $scope.user={
           username     : dataUser.result[0].username,
           id_periode   : $stateParams.idPeriode
       };
       $http({
           method       : 'POST',
           url          : urlConfig.gatewayUrl('report/periodeDetail'),
           data         : encoding_url($scope.user),
           headers      : {'Content-Type' : 'application/x-www-form-urlencoded'}
       })
           .success(function(response){
               if(response.message=='success')
               {
                   $scope.report = response.data;
               }
           })
           .error(function(errorResponse){

           })
   }
    catch(error){
        $state.go('login.user');
    }

    $scope.lihatDetail  = function(id){
        $state.go('web.reportDetail',{idPeriode :id});

    };
    $scope.cetak        = function(id){
        $state.go('web.reportCetak',{idPeriode :id});
    }

});