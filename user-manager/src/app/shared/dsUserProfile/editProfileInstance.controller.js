(function() {
  'use strict';

  angular.module('user-manager')

  .controller('editProfileInstanceController', function($modalInstance, user, SchoolsService) {
    var self = this;
    self.user = angular.copy(user);
    self.schools = SchoolsService.schools;

    self.close = function () {
      $modalInstance.dismiss('close');
    };

  })


})();
