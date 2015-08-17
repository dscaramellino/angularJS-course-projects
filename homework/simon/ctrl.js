var myApp = angular.module('myApp', ['ServicesModule']);

myApp.controller('myController', function($scope, $timeout, Simon, User, Options) {
  var ctrl = this;

  var simon;
  var user;
  var options = {};
  ctrl.options = options;
  ctrl.options.message = "Click Start Game to begin!"

  //create a new game
  ctrl.startGame = function() {
    simon = new Simon();
    user = new User();
    options = new Options();
    ctrl.options = options;
    moveForSimon();
  }

  var moveForSimon = function() {
    simon.playMoves(options);
    console.log(simon);
  }

  ctrl.processUserMove = function(move) {
    user.move(options, simon, move);
    console.log(user);
  };

});
