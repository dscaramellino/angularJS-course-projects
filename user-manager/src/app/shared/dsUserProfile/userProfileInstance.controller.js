(function() {
  'use strict';

  angular.module('user-manager')

  .controller('userProfileInstanceController', function($modalInstance, user, LoggedInUserService) {
    var self = this;
    user.isMyProfile = false;
    self.user = angular.copy(user);

    self.close = function () {
      $modalInstance.dismiss('close');
    };

    self.save = function () {
    };


  })

})();
