(function() {
  'use strict';

  angular.module('user-manager')

  .directive('dsTasksManager', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTaskManager/dsTasksManager.html',
      scope: {
        tasklists: '='
      },
      controller: 'dsTasksManagerController',
      controllerAs: 'dsTasksManagerCtrl',
      bindToController: true
    };
  })

  .controller('dsTasksManagerController', function($modal) {
    var self = this;

    self.openNewTaskModal = function(){
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/shared/dsTasks/dsTaskManager/newTaskInstance.html',
        controller: 'newTaskInstanceController',
        controllerAs: 'newTaskCtrl',
        bindToController: true,
        size: 'md',
        resolve: {
          tasklists: function () {
            return self.tasklists;
          }
        }
      });
    }

  });

})();
