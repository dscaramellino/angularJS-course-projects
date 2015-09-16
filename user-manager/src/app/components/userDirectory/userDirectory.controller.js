(function() {
  'use strict';

  angular.module('user-manager')

  .controller('UserDirectoryController', function (Users, SchoolsService, ClustersService, $filter) {
    var self = this;
    self.users = {};
    var allList;
    var staffList;
    var supportList;

    SchoolsService.listSchoolsAsync(function(schools) {
      self.allSchools = schools;
    });

    ClustersService.listClustersAsync(function(clusters) {
      self.allClusters = clusters;
    });

    Users.listUsersAsync(function(users) {
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





