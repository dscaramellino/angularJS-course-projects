(function() {
  'use strict';

  angular.module('user-manager')

  .directive('dsUserProfile', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsUserProfile/dsUserProfile.html',
      scope: {
        user: '='
      },
      controller: 'dsUserProfileController',
      controllerAs: 'dsUserProfileCtrl',
      bindToController: true
    };
  })

  .controller('dsUserProfileController', function($modal) {
    var self = this;

    self.openProfileEditor = function(user){
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/shared/dsUserProfile/editProfileInstance.html',
        controller: 'editProfileInstanceController',
        controllerAs: 'editProfileCtrl',
        bindToController: true,
        size: 'md',
        resolve: {
          user: function () {
            return user;
          }
        }
      });
    }

  })

})();
