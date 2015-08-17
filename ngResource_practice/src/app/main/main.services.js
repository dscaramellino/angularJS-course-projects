(function() {
  'use strict';

  angular.module('template')

  .factory('StudentResource', function ($resource) {

    return $resource('http://localhost:9000/v1/students/:id',

    //path and query params
    { id: '@id' },

    //actions
    {
      getStudent: {
        method: 'GET',
        headers: {
          Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6eyJfaWQiOiJOVi00NDQifSwibmFtZSI6IkFudGhvbnkgVmFsaWQgVXNlciIsImlhdCI6MTQyNTQ3MzUzNX0.dYo8W-n5XMulzSi9EvcgdbV8RtZ6RzyU6vk3hejKpQ0',
        },
        isArray: false
      }
    }

    );

  })

})();
