(function() {
  'use strict';

  angular.module('user-manager')

  .service('SchoolsService', function(SchoolsResource) {
    var self = this;
    self.schools = [];

    self.getSchools = function() {
      SchoolsResource.getSchools().$promise
      .then(function (response) {
        self.schools = response;
      }).catch(function (errorResponse) {
        console.log(errorResponse);
      });
    };

    self.getSchoolForUser = function(usersRole, schoolUser) {
      var school;
      if (schoolUser) {
        var userSchoolId = usersRole.schoolIds[0];
        for (var i=0; i<self.schools.length; i++) {
          if (self.schools[i].schoolId === userSchoolId) {
            if (self.schools[i].iconUrl === null) {
              self.schools[i].iconUrl = "/assets/img/school_icon.png"
            }
            school = self.schools[i];
          }
        }
      }
      return school;
    };

    self.getSchools();

  })

  .factory('SchoolsResource', function($resource) {

    return $resource('/assets/data/schools/schools.json', null,
      {
        getSchools: {
          method: 'GET',
          isArray: true
        }
      }
    );

  })

})();
