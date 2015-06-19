/**
 * Created by rizamasta on 6/16/15.
 */
App.controller('kandidatCtrl',function($scope,$state,$http,urlConfig){
    $scope.form =   {};
    var date,
        nama;
    $scope.submitSave = function(){

        try{
            date                = $scope.form.tgl_lahir.split("-");
            nama                = $scope.form.nama.toUpperCase();
            $scope.form.nama    = nama;
            if(date.length==3) {
                if(date[0]>1900 &&
                    date[1]>0&&date[1]<=12 &&
                        date[2]>0 && date[2]<=31
                )
                {
                if ($scope.form.ipk <= 4 && $scope.form.ipk >= 3) {
                    if (
                        $scope.form.prestasi <= 100 && $scope.form.prestasi >= 0 &&
                        $scope.form.keg_mhs <= 100 && $scope.form.keg_mhs >= 0 &&
                        $scope.form.kompetensi <= 100 && $scope.form.kompetensi > 0
                    ) {
                        $http({
                            method: 'POST',
                            url: urlConfig.gatewayUrl('kandidat/input'),
                            data: encoding_url($scope.form),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        })
                            .success(function (response) {
                                //console.log(response);
                                if(response.message=='success')
                                {
                                    window.alert('Berhasil menyimpan');
                                    $scope.form={}
                                }
                                else{
                                    window.alert(response.message);
                                }
                            })
                            .error(function (er) {
                                console.log(er);
                            })
                    }

                }
                    else{
                    window.alert('IPK tidak memadai');
                }
                }
                else {
                    window.alert('Tanggal input salah');
                }
            }
            else{
                window.alert('Format Tanggal Salah!')
            }
        }
        catch (err){
            $state.go('web.inputKandidat');
        }
    };

    $scope.viewList = function(){
      try{
          $http({
              method    : 'POST',
              url       : urlConfig.gatewayUrl('kandidat/view'),
              data      : '',
              headers   : {'Conten-Type' : 'application/x-www-form-urlencoded'}
          })
              .success(function(response){
                  if(response.message=='success') {
                      $scope.dataKandidat = response.data;
                  }
                  else{
                      window.alert(response.message);
                  }
              })
              .error(function(e){
                  console.log(e)
              });

      }
      catch(errorList){

      }
    };

});