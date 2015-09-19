(function() {
  'use strict';

  angular
    .module('user-manager')
    .config(function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/myProfile');

      $stateProvider
        .state('myProfile', {
          url: '/myProfile',
          templateUrl: 'app/components/myProfile/myProfile.html',
          controller: 'MyProfileController',
          controllerAs: 'myProfileCtrl'
        })
        .state('userDirectory', {
          url: '/userDirectory',
          templateUrl: 'app/components/userDirectory/userDirectory.html',
          controller: 'UserDirectoryController',
          controllerAs: 'userDirectoryCtrl'
        })
        .state('userManager', {
          url: '/userManager',
          templateUrl: 'app/components/userManager/userManager.html',
          controller: 'UserManagerController',
          controllerAs: 'userManagerCtrl'
        });

  });

})();
