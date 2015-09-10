(function() {
  'use strict';

  angular.module('template')

  .controller('UserManagerController', function (APIServices) {
    var self = this;
    self.state = APIServices.state;
  });

})();
