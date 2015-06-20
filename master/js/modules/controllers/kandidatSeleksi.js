/**
 * Created by rizamasta on 6/17/15.
 */
App.controller('kandidatSelectCtrl', function($scope,$http,urlConfig,$state){

    $scope.periodes = [{id:'ganjil',value:'Ganjil'},{id:'genap',value:'Genap'}];
    $scope.periode  = $scope.periodes[0];
    $scope.form     = {};

    $scope.submitProses= function(){
        try{
            var dataUser = JSON.parse(localStorage['data_login']);
            $scope.form.semester    = $scope.periode.id;
            $scope.form.username    = dataUser.result[0].username;
            $http({
                method      : 'POST',
                url         : urlConfig.gatewayUrl('seleksi/proses'),
                data        : encoding_url($scope.form),
                headers     : {'Content-Type':'application/x-www-form-urlencoded'}
            })
                .success(function(response){
                if(response.message=='success'){
                    window.alert('Berhasil Memperoses');
                    window.location.reload();
                }
                    else{
                    window.alert(response.message)
                }
            })
                .error(function(e){
                    window.alert(e)
                })
        }
        catch(error){
            $state.go('web.prosesSeleksiKandidat');
        }
    };

});