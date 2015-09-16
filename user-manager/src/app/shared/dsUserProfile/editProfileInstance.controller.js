(function() {
  'use strict';

  angular.module('user-manager')

  .controller('editProfileInstanceController', function($modalInstance, user, LoggedInUserService) {
    var loggedInUser = LoggedInUserService.state.loggedInUser;

    var self = this;
    self.user = angular.copy(user);
    self.showAlert = false;

    var alertNoChange = {
      title: "Hmmmm!",
      msg: "But you haven't made any changes to your profile, silly.",
      type: 'warning',
    }

    var alertFail = {
      title: "Wait a minute!",
      msg: "Looks like you forgot something.",
      type: 'danger',
    }

    self.close = function () {
      $modalInstance.dismiss('close');
    };

    self.save = function () {
      if (self.editProfileForm.$dirty) {
        if (self.editProfileForm.$valid) {
          loggedInUser.patchEditableFields(self.user);
          LoggedInUserService.state.loggedInUser = loggedInUser;
          self.close();
          // LoggedInUserService.updateUserByIdAsync(loggedInUser._id, loggedInUser, function(updatedLoggedInUser) {
          //   console.log('Success');
          //   LoggedInUserService.state.loggedInUser = updatedLoggedInUser;
          //   self.close();
          // });
        } else {
          self.alert = alertFail;
          self.showAlert = true;
        }
      } else {
        self.alert = alertNoChange;
        self.showAlert = true;
      }
    };

    self.closeAlert = function () {
      self.showAlert = false;
    };

  })


})();
