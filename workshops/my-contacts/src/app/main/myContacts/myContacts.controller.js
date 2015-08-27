(function() {
  'use strict';

  angular.module('myContacts', [])

  .controller('myContactsController', function (myContactsService) {
    var self = this;

    self.myContacts = myContactsService.myContacts;

  });

})();
