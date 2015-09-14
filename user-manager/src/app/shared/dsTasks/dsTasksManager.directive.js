(function() {
  'use strict';

  angular.module('user-manager')

  .directive('dsTasksManager', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTasksManager.html',
      scope: {
        tasks: '=tasks'
      },
      controller: 'dsTasksManagerController',
      controllerAs: 'dsTasksManagerCtrl',
      bindToController: true
    };
  })

  .controller('dsTasksManagerController', function() {
  })

})();
