(function() {
  'use strict';

  angular.module('user-manager')

  .directive('dsUserProfile', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsUserProfile/dsUserProfile.directive.html',
      scope: {
        state: '=state'
      },
      controller: 'dsUserProfileController',
      controllerAs: 'dsUserProfileCtrl',
      bindToController: true
    };
  })

  .controller('dsUserProfileController', function($scope, $modal, $log) {
    var self = this;

    self.openProfileEditor = function(user){
      console.log(user)
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/shared/dsUserProfile/editProfile.html',
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
