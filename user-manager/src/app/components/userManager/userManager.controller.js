(function() {
  'use strict';

  angular.module('user-manager')

  .controller('UserManagerController', function (Users) {
    var self = this;
    self.users = {};
    self.isLoadingContent = true;
    self.accounts = [{name: 'test1@domain.org'}, {name: 'test2@domain.org'}]

    Users.listUsersAsync(function(users) {
      self.isLoadingContent = false;
      self.users.staff = users.staff;
    });

  });

})();
