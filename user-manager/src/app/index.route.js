(function() {
  'use strict';

  angular
    .module('template')
    .config(function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.when('/', '/myProfile');

      $stateProvider
        .state('myProfile', {
          url: '/myProfile',
          templateUrl: 'app/myProfile/myProfile.html',
          controller: 'MyProfileController',
          controllerAs: 'myProfileCtrl'
        })
        .state('userDirectory', {
          url: '/userDirectory',
          templateUrl: 'app/userDirectory/userDirectory.html',
          controller: 'UserDirectoryController',
          controllerAs: 'userDirectoryCtrl'
        })
        .state('userManager', {
          url: '/userManager',
          templateUrl: 'app/userManager/userManager.html',
          controller: 'UserManagerController',
          controllerAs: 'userManagerCtrl'
        });

  });

})();
