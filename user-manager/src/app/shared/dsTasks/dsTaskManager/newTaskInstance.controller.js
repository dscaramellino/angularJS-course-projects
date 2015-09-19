(function() {
  'use strict';

  angular.module('user-manager')

  .controller('newTaskInstanceController', function($modalInstance, tasklists, TaskListsService) {
    var self = this;
    self.task = TaskListsService.createNewTask();

    self.close = function () {
      $modalInstance.dismiss('close');
    };

    self.save = function () {
      TaskListsService.addNewTaskToTaskList(tasklists, self.task);
      self.close();
    };

  })

})();
