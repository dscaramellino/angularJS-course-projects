(function() {
  'use strict';

  angular.module('template')

    .controller('NavigationCtrl', function(STATE_VALS) {
      var self = this;
      self.stateVals = STATE_VALS;
    })

    .config(function ($stateProvider, $urlRouterProvider, STATE_VALS) {

    $stateProvider

      .state(STATE_VALS.addContactState.stateName, {
        url: '/addContact',
        templateUrl: 'app/main/addContact/addContact.html',
        controller: 'addContactController',
        controllerAs: 'addContactCtrl'
      })

      .state(STATE_VALS.myContactsState.stateName, {
        url: '/myContacts',
        templateUrl: 'app/main/myContacts/myContacts.html',
        controller: 'myContactsController',
        controllerAs: 'myContactsCtrl'
      });

    $urlRouterProvider.otherwise('/');
  });

})();
