(function() {
  'use strict';

  angular.module('user-manager')

  .service('TaskListsService', function(LoggedInUserService, Task) {
    var self = this;

    var loggedInUserId = LoggedInUserService.state.loggedInUser._id;

    self.createNewTask = function() {
      return Task.createBlankTask(loggedInUserId);
    }

    self.addNewTaskToTaskList = function(tasklists, task) {
      task.processTask();
      tasklists.addTaskToList(task, loggedInUserId)
    }

    self.moveTask = function(tasklists, task, newStatus) {
      tasklists.moveTask(task, newStatus, loggedInUserId)
    }

  })

  .factory('TaskLists', function(Task) {

    var TaskLists = function() {
      this.assignedToYouOpen = [];
      this.assignedToYouArchived = [];
      this.assignedByYouToAnother = [];
      this.trashed = [];
    };

    TaskLists.createTaskListsFromData = function(tasks, userId) {
      var tasklists = new TaskLists();
      if (tasks) {
        for (var i=0; i<tasks.length; i++) {
          var task = new Task(tasks[i], userId);
          tasklists.addTaskToList(task);
        }
      };
      return tasklists;
    };

    TaskLists.prototype.addTaskToList = function(task) {
      this[task.taskType].push(task);
    }

    TaskLists.prototype.moveTask = function(task, newStatus, userId) {
      var taskId = task._id;
      var oldTaskType = task.taskType;
      var oldList = this[oldTaskType];
      task.changeStatus(newStatus, userId);
      var removed = false;
      for (var i=0; i<oldList.length; i++) {
        if (oldList[i]._id === taskId) {
          oldList.splice(i, 1);
          removed = true;
        }
      }
      if (removed) {
        console.log(task)
        this.addTaskToList(task);
      }
    }

    return TaskLists;

  })

  .factory('Task', function(UtilitiesService) {

    var Task = function(task, userId) {
      angular.extend(this, task);
      if (userId) this.processTask(userId);
    };

    Task.createBlankTask = function(userId) {
      var task = {
        priority: 'low',
        msg: '',
        source: null,
        author: userId,
        actor: null,
        createdOn: new Date(),
        status: 'Open',
        lastChangedOn: null
      }
      return new Task(task);
    };

    Task.prototype.changeStatus = function(newStatus, userId) {
      this.status = newStatus;
      this.lastChangedOn = new Date();
      this.processTask(userId);
    };

    Task.prototype.processTask = function(userId) {
      this.taskType = getTaskType(this.author, this.actor, this.status, userId);
      this.priorityClass = getTaskPriorityClass(this.priority);
      this.createdOn = UtilitiesService.createReadableDate(this.createdOn);
      this.lastChangedOn = UtilitiesService.createReadableDate(this.lastChangedOn);
    }

    var getTaskType = function(author, actor, status, userId) {
      if (status === 'Trashed') {
        return 'trashed';
      }
      if (author === userId && actor !== userId) {
        return 'assignedByYouToAnother';
      } else if (actor === userId) {
        if (status === 'Open') {
          return 'assignedToYouOpen';
        } else if (status === 'Archived') {
          return 'assignedToYouArchived';
        }
      }
      return null;
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

    return Task;

  })

})();


















