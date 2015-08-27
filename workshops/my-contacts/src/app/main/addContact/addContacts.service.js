
angular.module('template')

  .service('myContactsService', function() {
    var self = this;

    self.myContacts = [];

    self.addContactToMyContacts = function (contact) {
      self.myContacts.push(contact);
    }

  })
