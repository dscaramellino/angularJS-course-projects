(function() {
  'use strict';

  angular.module('template')

  .controller('UserDirectoryController', function (APIServices) {
    var self = this;
    self.state = APIServices.state;

  });

})();
