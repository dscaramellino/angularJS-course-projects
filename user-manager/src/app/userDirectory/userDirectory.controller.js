(function() {
  'use strict';

  angular.module('template')

  .controller('UserDirectoryController', function (APIServices, $filter) {
    var self = this;
    var staffList;
    var supportList;

    self.state = APIServices.state;
    self.isLoadingContent = true;

    APIServices.listUsers(null, function (users) {
      self.isLoadingContent = false;
      staffList = angular.copy(users.staff);
      supportList = angular.copy(users.support);
    });

    self.evaluateFilter = function() {
      var filterFunction = $filter('filter');
      self.state.users.staff = filterFunction(staffList, self.searchContext);
      self.state.users.support = filterFunction(supportList, self.searchContext);
    }



    // self.evaluateFilter();

  });

})();





