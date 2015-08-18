(function() {
  'use strict';

  angular.module('template')

  .factory('MapResource', function($resource) {
    return $resource('http://maps.googleapis.com/maps/api/geocode/json',
      null,
      null
    );
  });

})();
