(function() {
  'use strict';

  angular.module('user-manager')

  .controller('UserManagerController', function (Users) {
    var self = this;
    self.users = {};
    self.isLoadingContent = true;

    Users.listUsersAsync(function(users) {
      self.isLoadingContent = false;
      self.users.staff = users.staff;
    });

  });

})();
