(function() {
  'use strict';

  angular.module('user-manager')

  .directive('dsTaskListOpen', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTaskLists/dsTaskListOpen.html',
      scope: {
        tasks: '='
      },
      controller: 'dsTaskListOpenController',
      controllerAs: 'dsTaskListOpenCtrl',
      bindToController: true
    };
  })

  .controller('dsTaskListOpenController', function() {})

  .directive('dsTaskListArchived', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTaskLists/dsTaskListArchived.html',
      scope: {
        tasks: '='
      },
      controller: 'dsTaskListArchivedController',
      controllerAs: 'dsTaskListArchivedCtrl',
      bindToController: true
    };
  })

  .controller('dsTaskListArchivedController', function() {})

  .directive('dsTaskListAssigned', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTaskLists/dsTaskListAssigned.html',
      scope: {
        tasks: '='
      },
      controller: 'dsTaskListAssignedController',
      controllerAs: 'dsTaskListAssignedCtrl',
      bindToController: true
    };
  })

  .controller('dsTaskListAssignedController', function() {})

})();
