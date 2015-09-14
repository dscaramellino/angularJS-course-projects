(function() {
  'use strict';

  angular.module('user-manager')

  .controller('UserDirectoryController', function (Users, $filter) {
    var self = this;
    self.users = {};
    self.isLoadingContent = true;
    var allList;
    var staffList;
    var supportList;

    Users.listUsersAsync(function(users) {
      self.isLoadingContent = false;
      self.users.all = users.all;
      self.users.staff = users.staff;
      self.users.support = users.support;
      allList = angular.copy(users.all);
      staffList = angular.copy(users.staff);
      supportList = angular.copy(users.support);
    });

    self.evaluateFilter = function() {
      var filterFunction = $filter('filter');
      self.users.all = filterFunction(allList, self.searchContext);
      self.users.staff = filterFunction(staffList, self.searchContext);
      self.users.support = filterFunction(supportList, self.searchContext);
    }

  });

})();





