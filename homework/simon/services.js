var myApp = angular.module('ServicesModule', []);

myApp.value('ENABLE_EXPLICIT_AGE', 18);
myApp.value('COLORS', {
  "light-green": "green",
  "light-red": "red",
  "light-yellow": "yellow",
  "light-blue": "blue"
});

myApp.service('Utilities', function(COLORS, $timeout, $interval) {
  var self = this;

  self.lightColors = Object.keys(COLORS);
  self.$timeout = $timeout;
  self.$interval = $interval;

  self.showMove = function(options, user, move) {
    var lightColor = self.lightColors[move];
    var boldColor = COLORS[lightColor];
    options.setOption(move, boldColor);
    options.setMessage(boldColor);
    return self.completeMove(options, user, move);
  }

  self.completeMove = function(options, user, move) {
    return self.$timeout(function() {
      var lightColor = self.lightColors[move];
      options.setOption(move, lightColor);
      options.setMessage("");
      user.moveIndex++;
    }, "600");
  }

  self.toTitleCase = function(s) {
    return s.toLowerCase().replace(/^(.)|\s(.)/g, function($1) { return $1.toUpperCase(); });
  }

});

myApp.factory('Options', function(Utilities) {

  function Options() {
    this.colors = angular.copy(Utilities.lightColors);
    this.message;
  }

  Options.prototype.setOption = function(move, color) {
    var properColor = Utilities.toTitleCase(color);
    this.colors[move] = color;
  }

  Options.prototype.setMessage = function(color) {
    var properColor = Utilities.toTitleCase(color);
    this.message = properColor;
  }

  return Options;
});

myApp.factory('Simon', function(Utilities, Options) {

  function Simon() {
    this.name = "Simon";
    this.moves = [];
    this.moveIndex = 0;
  }

  Simon.prototype.newMove = function(move) {
    move = Math.floor(Math.random() * 4) + 0;
    this.moves.push(move);
  }

  Simon.prototype.playMoves = function(options) {
    var simon = this;
    this.newMove();
    Utilities.$interval(function() {
      var moveIndex = simon.moveIndex;
      var move = simon.moves[moveIndex];
      Utilities.showMove(options, simon, move).then(function() {
        if (simon.moveIndex === simon.moves.length) {
          simon.moveIndex = 0;
        }
      });
    }, "900", simon.moves.length);
  }

  return Simon;
});

myApp.factory('User', function(Utilities, Options) {

  function User() {
    this.name = "User";
    this.moveIndex = 0;
  }

  User.prototype.move = function(options, simon, move) {
    var user = this;
    var moveIndex = user.moveIndex;
    var simonsMove = simon.moves[moveIndex];
    if (move === simonsMove) {
      options.setMessage("Correct!");
      user.moveIndex++;
      if (moveIndex+1 === simon.moves.length) {
        user.moveIndex = 0;
        simon.playMoves(options, user);
      }
    } else {
      options.setMessage("WOMP WOMP Game over :( ");
    }

  }

  return User;
});



