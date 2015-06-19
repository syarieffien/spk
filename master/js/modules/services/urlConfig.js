/**
 * Created by rizamasta on 6/16/15.
 */
App.service('urlConfig',function(){
   //var urlBase,
   //    urlGateway;
    this.baseUrl = function (uri){
        return "http://localhost/belajar/spk/#/web"+uri;
    };
    this.gatewayUrl=function(uri){
        return "http://localhost/beasiswa-api/index.php/"+uri;
    };

});