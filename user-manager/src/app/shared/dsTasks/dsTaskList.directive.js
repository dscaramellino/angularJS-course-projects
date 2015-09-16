(function() {
  'use strict';

  angular.module('user-manager')

  .directive('dsTaskAssignedByYouToAnother', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTaskAssignedByYouToAnother.html',
      scope: {
        tasks: '=tasks'
      },
      controller: 'dsTaskAssignedByYouToAnotherController',
      controllerAs: 'dsTaskAssignedByYouToAnotherCtrl',
      bindToController: true
    };
  })

  .controller('dsTaskAssignedByYouToAnotherController', function() {
    console.log(this)
  })

  .directive('dsTaskAssignedToYouArchived', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTaskAssignedToYouArchived.html',
      scope: {
        tasks: '=tasks'
      },
      controller: 'dsTaskAssignedToYouArchivedController',
      controllerAs: 'dsTaskAssignedToYouArchivedCtrl',
      bindToController: true
    };
  })

  .controller('dsTaskAssignedToYouArchivedController', function() {})

  .directive('dsTaskAssignedToYouOpen', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTaskAssignedToYouOpen.html',
      scope: {
        tasks: '=tasks'
      },
      controller: 'dsTaskAssignedToYouOpenController',
      controllerAs: 'dsTaskAssignedToYouOpenCtrl',
      bindToController: true
    };
  })

  .controller('dsTaskAssignedToYouOpenController', function() {})

})();
