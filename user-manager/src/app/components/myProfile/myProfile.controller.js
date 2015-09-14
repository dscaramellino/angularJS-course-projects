(function() {
  'use strict';

  angular.module('user-manager')

  .controller('MyProfileController', function (User) {

    // Replace these variables once auth framework is added
    var USERID = 'user.json';

    var self = this;
    self.isLoading = true;

    User.getUserByIdAsync(USERID, function(user) {
      user.myProfile = true;
      self.user = user;
      self.isLoading = false;
    });

  });

})();
