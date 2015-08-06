var myApp = angular.module('myApp', ['ServicesModule']);

myApp.controller('myController', function($scope, User, SONGS_BY_GENRE, ENABLE_EXPLICIT_AGE) {
  var ctrl = this;
  ctrl.SONGS_BY_GENRE = angular.copy(SONGS_BY_GENRE);
  ctrl.type = 'clean';
  ctrl.disable = true;
  ctrl.selectedGenre = 'Pop';
  ctrl.user = new User();

  ctrl.processSelection = function(song) {
    if (song.checked) {
      ctrl.user.saveSongToHash(song.name, ctrl.type);
    } else {
      ctrl.user.removeSongFromHash(song.name);
    }
  }

  ctrl.assessDisable = function() {
    if (ctrl.user.age >= ENABLE_EXPLICIT_AGE) {
      ctrl.disable = false;
    } else {
      ctrl.disable = true;
    }
  }

  ctrl.saveSongSelections = function () {
    ctrl.user.saveSongsToArr();
    console.log(ctrl.user);
  }

});
