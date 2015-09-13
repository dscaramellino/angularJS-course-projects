(function() {
  'use strict';

  angular.module('user-manager')

  .service('UtilitiesService', function($filter) {
    var self = this;

    self.createReadableDate = function(date) {
      var filterFunction = $filter('date');
      return filterFunction(new Date(date), 'short')
    }

    self.toTitleCase = function(string) {
      return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

  })

})();
