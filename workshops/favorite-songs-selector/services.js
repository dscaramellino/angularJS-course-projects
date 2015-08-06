var myApp = angular.module('ServicesModule', []);

myApp.value('SONGS_BY_GENRE',
  {
    "Pop": [{name: "Pop A", checked: false}, {name: "Pop B", checked: false}, {name: "Pop C", checked: false}, {name: "Pop D", checked: false}],
    "Rock": [{name: "Rock A", checked: false}, {name: "Rock B", checked: false}, {name: "Rock C", checked: false}, {name: "Rock D", checked: false}],
    "Rap": [{name: "Rap A", checked: false}, {name: "Rap B", checked: false}, {name: "Rap C", checked: false}, {name: "Rap D", checked: false}]
  }
);

myApp.value('ENABLE_EXPLICIT_AGE', 18);


myApp.service('Utilities', function() {
  var self = this;

  self.hashToArray = function(hash) {
    var arr = [];
    for (var key in hash) {
      var obj = {};
      obj[key] = hash[key];
      arr.push(obj);
    }
    return arr;
  };

});

myApp.factory('User', function(Utilities) {

  function User() {
    this.favoriteSongsArr = [];
    this.favoriteSongsHash = {};
  }

  User.prototype.saveSongToHash = function(songName, type) {
    this.favoriteSongsHash[songName] = type;
  };

  User.prototype.removeSongFromHash = function(songName) {
    delete this.favoriteSongsHash[songName]
  };

  User.prototype.saveSongsToArr = function() {
    this.favoriteSongsArr = Utilities.hashToArray(this.favoriteSongsHash);
  };

  return User;
});


