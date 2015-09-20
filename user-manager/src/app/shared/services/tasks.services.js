(function() {
  'use strict';

  angular.module('user-manager')

  .service('TaskListsService', function(LoggedInUserService, Task) {
    var self = this;

    var loggedInUser = LoggedInUserService.state.loggedInUser
    var loggedInUserId = loggedInUser._id;
    var loggedInUserName = loggedInUser.profile.fullName;

    self.createNewTask = function() {
      return Task.createBlankTask(loggedInUserId, loggedInUserName);
    }

    self.addNewTaskToTaskList = function(tasklists, task) {
      task.processTask(loggedInUserId);
      tasklists.addTaskToList(task);
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

    TaskLists.createTaskListsFromData = function(tasks, loggedInUserId) {
      var tasklists = new TaskLists();
      if (tasks) {
        for (var i=0; i<tasks.length; i++) {
          var task = new Task(tasks[i], loggedInUserId);
          tasklists.addTaskToList(task);
        }
      };
      return tasklists;
    };

    TaskLists.prototype.addTaskToList = function(task) {
      this[task.taskType].push(task);
    }

    TaskLists.prototype.moveTask = function(task, newStatus, loggedInUserId) {
      var taskId = task._id;
      var oldTaskType = task.taskType;
      var oldList = this[oldTaskType];
      task.changeStatus(newStatus, loggedInUserId);
      var removed = false;
      for (var i=0; i<oldList.length; i++) {
        if (oldList[i]._id === taskId) {
          oldList.splice(i, 1);
          removed = true;
        }
      }
      if (removed) {
        this.addTaskToList(task);
      }
    }

    return TaskLists;

  })

  .factory('Task', function(UtilitiesService) {

    var Task = function(task, loggedInUserId) {
      angular.extend(this, task);
      if (loggedInUserId) this.processTask(loggedInUserId);
    };

    Task.createBlankTask = function(loggedInUserId, loggedInUserName) {
      var task = {
        priority: 'low',
        msg: '',
        source: null,
        author: {
          id: loggedInUserId,
          name: loggedInUserName
        },
        actor: {},
        createdOn: new Date(),
        status: 'Open',
        lastChangedOn: null
      }
      return new Task(task);
    };

    Task.prototype.changeStatus = function(newStatus, loggedInUserId) {
      this.status = newStatus;
      this.lastChangedOn = new Date();
      this.processTask(loggedInUserId);
    };

    Task.prototype.processTask = function(loggedInUserId) {
      this.taskType = getTaskType(this.author.id, this.actor.id, this.status, loggedInUserId);
      this.priorityClass = getTaskPriorityClass(this.priority);
      this.createdOn = UtilitiesService.createReadableDate(this.createdOn);
      this.lastChangedOn = UtilitiesService.createReadableDate(this.lastChangedOn);
    }

    var getTaskType = function(authorId, actorId, status, loggedInUserId) {
      if (status === 'Trashed') {
        return 'trashed';
      }
      if (authorId === loggedInUserId && actorId !== loggedInUserId) {
        return 'assignedByYouToAnother';
      } else if (actorId === loggedInUserId) {
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


















