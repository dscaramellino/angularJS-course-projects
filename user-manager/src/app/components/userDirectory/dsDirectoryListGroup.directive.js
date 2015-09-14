(function() {
  'use strict';

  angular.module('user-manager')

  .directive('dsDirectoryListGroup', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/userDirectory/dsDirectoryListGroup.html',
      scope: {
        users: '=users',
        title: '@'
      },
      controller: 'dsDirectoryListGroupController',
      controllerAs: 'dsDirectoryListGroupCtrl',
      bindToController: true
    };
  })

  .controller('dsDirectoryListGroupController', function($scope, $modal) {
    var self = this;

    self.openProfileModal = function(user){
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/shared/dsUserProfile/userProfileInstance.html',
        controller: 'userProfileInstanceController',
        controllerAs: 'userProfileInstanceCrtl',
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
