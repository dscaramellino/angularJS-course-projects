(function() {
  'use strict';

  angular.module('user-manager')

  .factory('User', function(UserResource, UtilitiesService) {

    var User = function(user) {
      angular.extend(this, user);
      this.profile.fullName = this.profile.firstName + " " + this.profile.lastName;
      this.status = UtilitiesService.toTitleCase(this.status);
      this.lastLogin = UtilitiesService.createReadableDate(this.lastLogin);
      this.toolGroups = User.processToolGroups(this.toolGroups);
      this.tasks = User.processTasks(this.tasks);
    }

    User.getUserByIdAsync = function(id, callback) {
      UserResource.getUserById({id: id}).$promise
      .then(function (response) {
        callback(new User(response));
      })
      .catch(function (errorResponse) {
        console.log(errorResponse);
      });
    }

    User.processToolGroups = function(toolGroups) {
      var p = {
        toolGroups: [],
        toolEditor: false,
        toolViewer: false
      };
      return toolGroups.reduce(function(p, c) {
        var group = c.split('@')[0];
        p.toolGroups.push(group);

        if (group.indexOf('_sorter_editor') !== -1 ) {
          p.toolEditor = true;
          p.toolViewer = true;
        } else if (group.indexOf('_sorter_viewer') !== -1 ) {
          p.toolEditor = false;
          p.toolViewer = true;
        }
        return p;
      }, p);
    };

    var getTaskType = function(priority) {
      if (priority === 'low') {
        return 'info';
      }
      if (priority === 'med') {
        return 'warning';
      }
      if (priority === 'high') {
        return 'danger';
      }
    }

    User.processTasks = function(tasks) {
      if (tasks) {
        var p = {
          openTasks: [],
          archivedTasks: [],
        };
        return tasks.reduce(function(p, c) {
          c.type = getTaskType(c.priority);
          if (c.status === 'Open') {
            p.openTasks.push(c);
          } else if (c.status === 'Archived') {
            p.archivedTasks.push(c);
          }
          return p;
        }, p);
      };
    };

    return User;

  })

  .factory('UserResource', function($resource) {

    return $resource('/assets/data/users/:id',
      {
        id: '@id'
      },
      {
        getUserById: {
          method: 'GET',
          isArray: false
        }
      }
    );

  })

})();
