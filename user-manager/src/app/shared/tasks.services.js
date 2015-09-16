(function() {
  'use strict';

  angular.module('user-manager')

  .factory('TaskList', function(UtilitiesService) {

    var TaskList = function(config) {
      angular.extend(this, config);
    };

    TaskList.buildTaskListWithData = function(tasks, loggedInUserId) {
      var config = {
        assignedToYouOpen: [],
        assignedToYouArchived: [],
        assignedByYouToAnother: []
      };
      if (tasks) {
        for (var i=0; i<tasks.length; i++) {
          var task = processTask(tasks[i], loggedInUserId);
          if (task.taskType === 'assignedToYouOpen') config.assignedToYouOpen.push(task);
          if (task.taskType === 'assignedToYouArchived') config.assignedToYouArchived.push(task);
          if (task.taskType === 'assignedByYouToAnother') config.assignedByYouToAnother.push(task);
        }
      };
      return new TaskList(config);
    };

//newTask._id = Math.floor(Math.random()*90000) + 10000;

    TaskList.prototype.addTask = function(newTask, loggedInUserId) {
      this.push(processTask(newTask, loggedInUserId));
    };

    TaskList.prototype.removeTaskById = function(taskId) {
      for (var i=0; i<this.length; i++) {
        if (this._id === taskId) {
          this.splice(i, 1);
        }
      }
    };

    TaskList.prototype.updateTaskById = function(taskId, newStatus, loggedInUserId) {
      var taskId = task._id;
      this.taskId.status = newStatus;
      processTask(this, loggedInUserId);
    };

    var processTask = function(task, loggedInUserId) {
      task.taskType = getTaskType(task.author, task.actor, task.status, loggedInUserId);
      task.priorityClass = getTaskPriorityClass(task.priority);
      task.createdOn = UtilitiesService.createReadableDate(task.createdOn);
      task.archivedOn = UtilitiesService.createReadableDate(task.archivedOn);
      return task;
    }

    var getTaskType = function(author, actor, status, loggedInUserId) {
      var type;
      if (author === loggedInUserId && actor !== loggedInUserId) {
        type = 'assignedByYouToAnother';
      } else if (actor === loggedInUserId) {
        if (status === 'Open') {
          type = 'assignedToYouOpen';
        } else if (status === 'Archived') {
          return 'assignedToYouArchived';
        }
      }
      return type;
    };

    var getTaskPriorityClass = function(priority) {
      if (priority === 'low') {
        return 'info';
      }
      if (priority === 'med') {
        return 'warning';
      }
      if (priority === 'high') {
        return 'danger';
      }
    };

    return TaskList;

  })

  .factory('Task', function() {

  })

})();
