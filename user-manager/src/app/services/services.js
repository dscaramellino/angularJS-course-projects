(function() {
  'use strict';

  angular.module('template')

  .service('UserServices', function($filter) {
    var self = this;

    self.createReadableDate = function(date) {
      var filterFunction = $filter('date');
      return filterFunction(new Date(date), 'medium')
    }

    self.toTitleCase = function(string) {
      return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    self.processToolGroups = function(toolGroups) {
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

  })

  .service('APIServices', function(UserResource, UsersResource, SchoolResource, Users, User) {
    var self = this;
    self.state = {};

    self.getUserById = function(id) {
      UserResource.getUserById({id: id}).$promise
      .then(function (response) {
        self.state.user = new User(response);
      }).catch(function (errorResponse) {
        console.log(errorResponse);
      });
    }

    self.listUsers = function(optFilter, callback) {
      optFilter = optFilter ? {where: optFilter} : undefined;

      UsersResource.listUsers(optFilter).$promise
      .then(function (response) {
        self.state.users = Users.buildUsersWithData(response);
        callback(self.state.users);
      }).catch(function (errorResponse) {
        console.log(errorResponse);
      });
    }

    self.getSchoolById = function(id) {
      SchoolResource.getSchoolById({id: id}).$promise
      .then(function (response) {
        self.state.school = response;
      }).catch(function (errorResponse) {
        console.log(errorResponse);
      });
    }

    self.getUserById('user.json');
    self.getSchoolById('school1.json');

  })

  .factory('UserResource', function($resource) {

    return $resource('/app/assets/users/:id',
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

  .factory('UsersResource', function($resource) {

    return $resource('/app/assets/users/users.json',
      null,
      {
        listUsers: {
          method: 'GET',
          isArray: true
        }
      }
    );

  })

  .factory('SchoolResource', function($resource) {

    return $resource('/app/assets/schools/:id',
      {
        id: '@id'
      },
      {
        getSchoolById: {
          method: 'GET',
          isArray: false
        }
      }
    );

  })

  .factory('User', function(UserServices) {

    var User = function(user) {
      angular.extend(this, user);
      this.status = UserServices.toTitleCase(this.status);
      this.lastLogin = UserServices.createReadableDate(this.lastLogin);
      this.toolGroups = UserServices.processToolGroups(this.toolGroups);
    }

    return User;

  })

  .factory('Users', function(User) {

    var Users = function(config) {
      angular.extend(this, config);
    }

    Users.buildUsersWithData = function(data) {
      var config = {
        staff: [],
        support: []
      }
      data.map(function(user) {
        user = new User(user);
        if (user.usersRole.type === 'cluster' || user.usersRole.type === 'super_admin') {
          config.support.push(user);
        } else {
          config.staff.push(user);
        }
      });

      return new Users(config);
    }

    return Users;

  });

})();
