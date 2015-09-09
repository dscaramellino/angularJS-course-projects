(function() {
  'use strict';

  angular.module('template')

  .service('APIServices', function(UserResource, UsersResource, SchoolResource) {
    var self = this;
    self.state = {};

    self.createReadableDate = function(date) {
      var date = date || new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }

    self.toTitleCase = function(string) {
      return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    self.getUserById = function(id) {
      UserResource.getUserById({id: id}).$promise
      .then(function (response) {
        self.state.user = response;
        self.state.user.status = self.toTitleCase(self.state.user.status);
        self.state.user.lastLogin = self.createReadableDate(new Date(self.state.user.lastLogin));
      }).catch(function (errorResponse) {
        console.log(errorResponse);
      });
    }

    self.listUsers = function(optFilter) {
      optFilter = optFilter ? {where: optFilter} : undefined;

      UsersResource.listUsers(optFilter).$promise
      .then(function (response) {
        self.state.users = response;
      }).catch(function (errorResponse) {
        console.log(errorResponse);
      });
    }

    self.getSchoolById = function(id) {
      SchoolResource.getSchoolById({id: id}).$promise
      .then(function (response) {
        console.log(response)
        self.state.school = response;
      }).catch(function (errorResponse) {
        console.log(errorResponse);
      });
    }

    self.getUserById('user.json');
    self.getSchoolById('school1.json');
    self.listUsers();

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

  });

})();
