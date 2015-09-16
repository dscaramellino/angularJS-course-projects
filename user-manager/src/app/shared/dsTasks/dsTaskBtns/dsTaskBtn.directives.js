(function() {
  'use strict';

  angular.module('user-manager')

  .directive('dsTaskAddBtn', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTaskBtns/dsTaskAddBtn.html',
      scope: {
        task: '=task'
      },
      controller: 'dsTaskAddBtnController',
      controllerAs: 'dsTaskAddBtnCtrl',
      bindToController: true
    };
  })

  .controller('dsTaskAddBtnController', function() {})

  .directive('dsTaskArchiveBtn', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTaskBtns/dsTaskArchiveBtn.html',
      scope: {
        task: '=task'
      },
      controller: 'dsTaskArchiveBtnController',
      controllerAs: 'dsTaskArchiveBtnCtrl',
      bindToController: true
    };
  })

  .controller('dsTaskArchiveBtnController', function(LoggedInUserService) {
    var self = this;
    console.log(self)
    self.archive = function() {
      this.status === 'archived'
    }
  })

  .directive('dsTaskReOpenBtn', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTaskBtns/dsTaskReOpenBtn.html',
      scope: {
        task: '=task'
      },
      controller: 'dsTaskReOpenBtnController',
      controllerAs: 'dsTaskReOpenBtnCtrl',
      bindToController: true
    };
  })

  .controller('dsTaskReOpenBtnController', function() {})

  .directive('dsTaskTrashBtn', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/dsTasks/dsTaskBtns/dsTaskTrashBtn.html',
      scope: {
        task: '=task'
      },
      controller: 'dsTaskTrashBtnController',
      controllerAs: 'dsTaskTrashBtnCtrl',
      bindToController: true
    };
  })

  .controller('dsTaskTrashBtnController', function() {})

})();
