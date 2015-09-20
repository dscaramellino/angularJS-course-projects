(function() {
  'use strict';

  angular.module('user-manager')

  .controller('UserDirectoryController', function (SchoolsService, ClustersService, UsersService, $filter) {
    var self = this;
    self.users;
    self.allSchools;
    self.allClusters;
    var allList;
    var staffList;
    var supportList;

    SchoolsService.listSchoolsAsync(function(schools) {
      self.allSchools = schools;
    });

    ClustersService.listClustersAsync(function(clusters) {
      self.allClusters = clusters;
    });

    UsersService.listUsersAsync(function(users) {
      self.users = users;
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





