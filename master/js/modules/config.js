/**=========================================================
 * Module: config.js
 * App routes and resource
 =========================================================*/
App.config(['$stateProvider','$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'APP_REQUIRES',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, appRequires) {
  'use strict';

  App.controller = $controllerProvider.register;
  App.directive  = $compileProvider.directive;
  App.filter     = $filterProvider.register;
  App.factory    = $provide.factory;
  App.service    = $provide.service;
  App.constant   = $provide.constant;
  App.value      = $provide.value;

  // LAZY MODULES
  // -----------------------------------

  $ocLazyLoadProvider.config({
    debug: false,
    events: true,
    modules: appRequires.modules
  });


  // defaults to dashboard
$urlRouterProvider.otherwise('/web/dashboard');

  //
  // Application Routes
  // -----------------------------------
  $stateProvider
    .state('web', {
        url: '/web',
        abstract: true,
        templateUrl: basepath('app.html'),
        controller: ('AppController'),
        resolve: resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl')
    })
    .state('web.dashboard', {
        url: '/dashboard',
        title: 'Dashboard',
        templateUrl: basepath('dashboard.html'),
        resolve: resolveFor('flot-chart','flot-chart-plugins'),
        controller:'NullController'
    })
      .state('web.inputKandidat', {
          url: '/inputKandidat',
          title: 'Input Kandidat',
          templateUrl: basepath('inputKandidat.html'),
          resolve: resolveFor('flot-chart','flot-chart-plugins','parsley'),
          controller:'NullController'
      })
      .state('web.prosesSeleksiKandidat', {
          url: '/prosesSeleksiKandidat',
          title: 'Proses Seleksi Kandidat',
          templateUrl: basepath('prosesSeleksiKandidat.html'),
          resolve: resolveFor('flot-chart','flot-chart-plugins','parsley'),
          controller:'NullController'
      })
      .state('web.hasilProses', {
          url: '/hasilProses',
          title: 'Hasil Proses',
          templateUrl: basepath('hasilProses.html'),
          resolve: resolveFor('flot-chart','flot-chart-plugins'),
          controller:'NullController'
      })
      .state('web.listKandidat', {
          url: '/listKandidat',
          title: 'List Kandidat',
          templateUrl: basepath('listKandidat.html'),
          resolve: resolveFor('flot-chart','flot-chart-plugins'),
          controller:'NullController'
      })
      .state('web.report', {
          url: '/report',
          title: 'Report',
          templateUrl: basepath('report.html'),
          resolve: resolveFor('flot-chart','flot-chart-plugins'),
          controller:'NullController'
      })

    .state('login', {
        url: '/login',
        abstract: true,
        title: 'Login',
        templateUrl: 'app/pages/login.html',
        controller: 'loginController'

    })
    .state('login.user', {
        url: '/user',
        title: 'Login',
        templateUrl: 'app/pages/login.html',
        controller: 'loginController',
        resolve: resolveFor('parsley')
    })
    .state('login.out', {
        url: '/logout',
        title: 'Logout',
        controller: 'logoutController'
    })
    ;



    // Set here the base of the relative path
    // for all app views
    function basepath(uri) {
      return 'app/views/' + uri;
    }

    // Generates a resolve object by passing script names
    // previously configured in constant.APP_REQUIRES
    function resolveFor() {
      var _args = arguments;
      return {
        deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
          // Creates a promise chain for each argument
          var promise = $q.when(1); // empty promise
          for(var i=0, len=_args.length; i < len; i ++){
            promise = andThen(_args[i]);
          }
          return promise;

          // creates promise to chain dynamically
          function andThen(_arg) {
            // also support a function that returns a promise
            if(typeof _arg == 'function')
                return promise.then(_arg);
            else
                return promise.then(function() {
                  // if is a module, pass the name. If not, pass the array
                  var whatToLoad = getRequired(_arg);
                  // simple error check
                  if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                  // finally, return a promise
                  return $ocLL.load( whatToLoad );
                });
          }
          // check and returns required data
          // analyze module items with the form [name: '', files: []]
          // and also simple array of script files (for not angular js)
          function getRequired(name) {
            if (appRequires.modules)
                for(var m in appRequires.modules)
                    if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                        return appRequires.modules[m];
            return appRequires.scripts && appRequires.scripts[name];
          }

        }]};
    }

}]).config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix : 'app/i18n/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';


  }])
.controller('NullController', ['$rootScope','$state', function($rootScope,$state) {
        $rootScope.currTitle = $state.current.title;
        $rootScope.pageTitle = function() {
            return $rootScope.app.name + ' - ' + ($rootScope.currTitle);
        };
    }]);
