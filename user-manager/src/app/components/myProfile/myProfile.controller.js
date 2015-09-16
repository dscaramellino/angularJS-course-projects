(function() {
  'use strict';

  angular.module('user-manager')

  .controller('MyProfileController', function (LoggedInUserService) {
    var self = this;
    self.state = LoggedInUserService.state;

    var isLoading = self.state.isLoading;

    LoggedInUserService.loadLoggedInUserProfile(true);

  });

})();
