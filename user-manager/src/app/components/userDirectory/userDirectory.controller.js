(function() {
  'use strict';

  angular.module('user-manager')

  .controller('UserDirectoryController', function (Users, $filter) {
    var self = this;
    self.users = {};

    self.isLoadingContent = true;
    var staffList;
    var supportList;

    Users.listUsersAsync(function(users) {
      self.isLoadingContent = false;
      self.users.staff = users.staff;
      self.users.support = users.support;
      staffList = angular.copy(users.staff);
      supportList = angular.copy(users.support);
    });

    self.evaluateFilter = function() {
      var filterFunction = $filter('filter');
      self.users.staff = filterFunction(staffList, self.searchContext);
      self.users.support = filterFunction(supportList, self.searchContext);
    }

  });

})();





