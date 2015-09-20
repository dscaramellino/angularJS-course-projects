(function() {
  'use strict';

  angular.module('user-manager')

  .service('SchoolsService', function(SchoolsResource) {
    var self = this;
    self.schools;

    self.listSchoolsAsync = function(callback) {
      SchoolsResource.getSchools().$promise
      .then(function (response) {
        self.allSchools = response;
        if (callback) callback(response);
      }).catch(function (errorResponse) {
        console.log(errorResponse);
      });
    };

    self.getSchoolForUser = function(usersRole, schoolUser) {
      var school;
      if (schoolUser) {
        var userSchoolId = usersRole.schoolIds[0];
        for (var i=0; i<self.allSchools.length; i++) {
          var thisSchool = self.allSchools[i];
          var thisSchoolId = thisSchool.schoolId;
          var thisSchoolIconUrl = thisSchool.iconUrl;
          if (thisSchoolId === userSchoolId) {
            if (thisSchoolIconUrl === null) {
              thisSchoolIconUrl = "/assets/img/school_icon.png"
            }
            school = thisSchool;
          }
        }
      }
      return school;
    };

    self.listSchoolsAsync();

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
