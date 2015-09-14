(function() {
  'use strict';

  angular.module('user-manager')

  .controller('userProfileInstanceController', function($modalInstance, user) {
    var self = this;
    self.user = angular.copy(user);
    user.myProfile = false;

    self.close = function () {
      $modalInstance.dismiss('close');
    };

  })

})();
