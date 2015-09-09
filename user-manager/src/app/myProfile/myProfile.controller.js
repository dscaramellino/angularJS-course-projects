(function() {
  'use strict';

  angular.module('template')

  .controller('MyProfileController', function (APIServices) {
    var self = this;
    self.state = APIServices.state;


  });

})();
