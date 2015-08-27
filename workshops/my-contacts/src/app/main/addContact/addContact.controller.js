(function() {
  'use strict';

  angular.module('template')

  .controller('addContactController', function ($timeout, $state, myContactsService) {
    var self = this;

    self.formObj = {};

    self.onSubmit = function() {
      var status = 0;
      if (self.myForm.$valid) {
        //Submit the form
        myContactsService.addContactToMyContacts(self.formObj);
        self.formFeedback = "Success!";
        status = 1;
      } else {
        self.formFeedback = "Invalid form. Please correct your errors.";
      }
      clearFormOnDelay(status);
    };

    var clearFormOnDelay = function (status) {
      return $timeout(function() {
        self.formFeedback = undefined;
        if (status) {
          self.formObj = {};
          //$state.go('myContacts');
        }
      }, "2000");
    }

  });

})();
