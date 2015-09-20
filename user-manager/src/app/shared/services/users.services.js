(function() {
  'use strict';

  angular.module('user-manager')

  .service('UsersService', function(UsersResource, Users) {
    var self = this;

    self.listUsersAsync = function(callback) {
      UsersResource.listUsers().$promise
      .then(function (response) {
        var users = Users.buildUsersWithData(response);
        if (callback) callback(users);
      }).catch(function (errorResponse) {
        console.log(errorResponse);
      });
    }

  })

  .factory('Users', function(User) {

    var Users = function(config) {
      angular.extend(this, config);
    }

    Users.buildUsersWithData = function(data) {
      var config = {
        all: [],
        staff: [],
        support: []
      }
      data.map(function(user) {
        user = new User(user);
        config.all.push(user);
        if (user.supportUser) {
          config.support.push(user);
        } else {
          config.staff.push(user);
        }
      });
      return new Users(config);
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
