/**
 * Created by rizamasta on 6/17/15.
 */
App.controller('kandidatSelectCtrl', function($scope,$http,urlConfig,$state){

    $scope.periodes = [{id:'Ganjil',value:'Ganjil'},{id:'Genap',value:'Genap'}];
    $scope.periode  = $scope.periodes[0];
    $scope.form     = {};
    $scope.submitProses= function(){
        try{
            $scope.form.quota = $scope.periode.value;
            $http({
                method      : 'POST',
                url         : urlConfig.gatewayUrl('kandidat/proses')
            })
        }
        catch(error){
            $state.go('web.prosesSeleksiKandidat');
        }
    };

});