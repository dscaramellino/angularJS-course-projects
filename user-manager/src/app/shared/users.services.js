(function() {
  'use strict';

  angular.module('user-manager')

  .service('UsersService', function(UsersResource, Users, User) {
    var self = this;
    self.users = {};

    self.listUsersAsync = function(callback) {
      UsersResource.listUsers().$promise
      .then(function (response) {
        var users = buildUsersWithData(response);
        self.users.all = users.all;
        self.users.staff = users.staff;
        self.users.support = users.support;
        if (callback) callback(users);
      }).catch(function (errorResponse) {
        console.log(errorResponse);
      });
    }

    var buildUsersWithData = function(data) {
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

  })

  .factory('Users', function(UsersResource, User) {

    var Users = function(config) {
      angular.extend(this, config);
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
