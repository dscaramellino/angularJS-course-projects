(function() {
  'use strict';

  angular.module('user-manager')

  .factory('Users', function(UsersResource, User) {

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

    Users.listUsersAsync = function(callback) {
      UsersResource.listUsers().$promise
      .then(function (response) {
        callback(Users.buildUsersWithData(response));
      }).catch(function (errorResponse) {
        console.log(errorResponse);
      });
    }

    return Users;

  })

  .factory('UsersResource', function($resource) {

    return $resource('/assets/data/users/users.json',
      null,
      {
        listUsers: {
          method: 'GET',
          isArray: true
        }
      }
    );

  })

})();
