(function() {
  'use strict';

  angular.module('user-manager')

  .service('ClustersService', function(ClustersResource) {
    var self = this;
    self.clusters;

    self.listClustersAsync = function(callback) {
      ClustersResource.getClusters().$promise
      .then(function (response) {
        self.clusters = response;
        if (callback) callback(response);
      }).catch(function (errorResponse) {
        console.log(errorResponse);
      });
    };

    self.getClustersForUser = function(usersRole, clusterUser) {
      var userClusters = [];
      if (clusterUser) {
        var userClusterIds = usersRole.clusterIds; //this is an array
        for (var i=0; i<self.allClusters.length; i++) {
          var thisCluster = self.allClusters[i]
          var thisClusterId = thisCluster.clusterId;
          if (userSchoolIds.indexOf(thisClusterId) > -1) {
            userClusters.push(thisCluster);
          }
        }
      }
      return userClusters;
    };

  })

  .factory('ClustersResource', function($resource) {

    return $resource('/assets/data/clusters/clusters.json', null,
      {
        getClusters: {
          method: 'GET',
          isArray: true
        }
      }
    );

  })

})();
