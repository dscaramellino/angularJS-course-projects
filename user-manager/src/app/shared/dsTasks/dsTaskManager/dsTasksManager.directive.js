(function() {
  'use strict';

  angular.module('user-manager')

  .directive('dsTasksManager', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTaskManager/dsTasksManager.html',
      scope: {
        tasks: '='
      },
      controller: 'dsTasksManagerController',
      controllerAs: 'dsTasksManagerCtrl',
      bindToController: true
    };
  })

  .controller('dsTasksManagerController', function() {});

})();
