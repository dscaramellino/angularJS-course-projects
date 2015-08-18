(function() {
  'use strict';

  angular.module('template')

  .controller('MainController', function (MapResource) {
    var crtl = this;

    crtl.name = "Google Maps Address Finder";

    crtl.findAddresses = function() {
      var self = this;
      console.log(self.query);
      console.log("finding addresses...");
      MapResource.get({address: self.query}).$promise
      .then(function (addresses) {
        self.addresses = [];
        addresses = JSON.parse(JSON.stringify(addresses)).results;
        addresses.map(function(address){
          self.addresses.push(address);
        });
      }).catch(function(err) {
        console.log(err);
      });
    }

  });

})();
