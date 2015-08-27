/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';
  angular.module('template')

    .constant('STATE_VALS', {
      addContactState: {
        stateName: 'addContact'
      },
      myContactsState: {
        stateName: 'myContacts'
      }
    })
})();
