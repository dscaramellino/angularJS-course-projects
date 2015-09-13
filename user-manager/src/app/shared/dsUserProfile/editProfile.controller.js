(function() {
  'use strict';

  angular.module('user-manager')

  .controller('editProfileInstanceController', function($modalInstance, user) {
    var self = this;
    console.log(user);
    self.user = angular.copy(user);

  })


})();
