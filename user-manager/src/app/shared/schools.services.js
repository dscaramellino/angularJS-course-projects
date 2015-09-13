(function() {
  'use strict';

  angular.module('user-manager')

  .factory('School', function(SchoolResource) {

    var School = function(school) {
      angular.extend(this, school);
    }

    School.getSchoolByIdAsync = function(id, callback) {
      SchoolResource.getSchoolById({id: id}).$promise
      .then(function (response) {
        callback(new School(response));
      }).catch(function (errorResponse) {
        console.log(errorResponse);
      });
    }

    return School;

  })

  .factory('SchoolResource', function($resource) {

    return $resource('/assets/data/schools/:id',
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

})();
