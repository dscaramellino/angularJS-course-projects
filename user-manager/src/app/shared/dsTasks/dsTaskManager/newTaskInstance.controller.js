(function() {
  'use strict';

  angular.module('user-manager')

  .controller('newTaskInstanceController', function($modalInstance, tasklists, TaskListsService, UsersService) {
    var self = this;
    self.task = TaskListsService.createNewTask();
    self.showAlert = false;
    self.alert;

    var alertFail = {
      title: "Wait a minute!",
      msg: "Looks like you forgot something.",
      type: 'danger',
    }

    UsersService.listUsersAsync(function(users) {
      self.users = users;
    });

    self.close = function () {
      $modalInstance.dismiss('close');
    };

    self.save = function () {
      if (self.newTaskForm.$valid) {
        self.task.actor.id = self.selectedActor._id;
        self.task.actor.name = self.selectedActor.profile.fullName;
        TaskListsService.addNewTaskToTaskList(tasklists, self.task);
        self.close();
      } else {
        self.alert = alertFail;
        self.showAlert = true;
      }
    };

    self.closeAlert = function () {
      self.showAlert = false;
    };

  })

})();
