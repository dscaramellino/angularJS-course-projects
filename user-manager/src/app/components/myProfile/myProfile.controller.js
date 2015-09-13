(function() {
  'use strict';

  angular.module('user-manager')

  .controller('MyProfileController', function (User, School, md5) {

    // Replace these variables once auth framework is added
    var SCHOOLID = 'school1.json';
    var USERID = 'user.json';

    var self = this;
    self.state = {};
    self.isLoadingContentIndex = 0;

    User.getUserByIdAsync(USERID, function(user) {
      user.gravatarImgUrl = createGravatarImgUrl(user.gafeEmail);
      self.state.user = user;
      assessIsLoading();
    });

    var createGravatarImgUrl = function(email) {
      var gravatarHash = md5.createHash(email);
      return "http://www.gravatar.com/avatar/" + gravatarHash + "?s=200.jpg";
    }

    School.getSchoolByIdAsync(SCHOOLID, function(school) {
      self.state.school = school;
      assessIsLoading();
    });

    var assessIsLoading = function() {
      self.isLoadingContentIndex++;
      self.isLoadingContent = self.isLoadingContentIndex === 2 ? false : true;
    }

  });

})();
