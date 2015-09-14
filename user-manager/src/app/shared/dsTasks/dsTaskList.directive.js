(function() {
  'use strict';

  angular.module('user-manager')

  .directive('dsTaskList', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTaskList.html',
      scope: {
        tasks: '=tasks'
      },
      controller: 'dsTaskListController',
      controllerAs: 'dsTaskListCtrl',
      bindToController: true
    };
  })

  .controller('dsTaskListController', function() {
  })

})();
