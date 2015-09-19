(function() {
  'use strict';

  angular.module('user-manager')

  .directive('dsTaskBtn', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTaskBtn/dsTaskBtn.html',
      controller: 'dsTaskBtnController',
      controllerAs: 'dsTaskBtnCtrl',
      scope: {
        tasks: '=',
        task: '=',
        btntype: '@btntype'
      },
      bindToController: true
    };
  })

  .controller('dsTaskBtnController', function(TaskListsService) {
    var self = this;
    self.actions = TaskListsService;
  })

})();
