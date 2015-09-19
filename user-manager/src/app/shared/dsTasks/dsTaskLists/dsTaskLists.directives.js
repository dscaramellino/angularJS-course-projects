(function() {
  'use strict';

  angular.module('user-manager')

  .directive('dsTaskLists', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTaskLists/dsTaskLists.html',
      controller: 'dsTaskListsController',
      controllerAs: 'dsTaskListsCtrl',
      scope: {
        tasklists: '=',
        type: '@type'
      },
      bindToController: true
    };
  })

  .controller('dsTaskListsController', function() {})

})();
