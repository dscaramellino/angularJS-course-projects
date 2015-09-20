(function() {
  'use strict';

  angular.module('user-manager')

  .controller('userProfileInstanceController', function($modalInstance, user) {
    var self = this;
    self.user = user;

    self.close = function () {
      $modalInstance.dismiss('close');
    };

  })

})();
