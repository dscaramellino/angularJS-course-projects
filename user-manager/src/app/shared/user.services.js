(function() {
  'use strict';

  angular.module('user-manager')

  .service('LoggedInUserService', function(User, UserResource) {
    //replace this eventually
    var LOGGEDINUSERID = 'user.json';

    var self = this;
    self.state = {};
    self.state.isLoading = true;

    self.loadLoggedInUserProfile = function(showEditBtn) {
      getUserByIdAsync(LOGGEDINUSERID, function(user) {
        self.state.loggedInUser = user;
        if (showEditBtn) addEditBtnProp();
        self.state.isLoading = false;
      });
    }

    self.updateUserByIdAsync = function(id, user, callback) {
      UserResource.updateUserById({id: id}, user).$promise
      .then(function (response) {
        callback(new User(response));
      })
      .catch(function (errorResponse) {
        console.log(errorResponse);
      });
    }

    var getUserByIdAsync = function(id, callback) {
      UserResource.getUserById({id: id}).$promise
      .then(function (response) {
        callback(new User(response));
      })
      .catch(function (errorResponse) {
        console.log(errorResponse);
      });
    }


    var addEditBtnProp = function() {
      self.state.loggedInUser.isMyProfile = true;
    }

  })


  .factory('User', function(UserResource, SchoolsService, UtilitiesService, TaskList, md5) {

    var User = function(user) {
      angular.extend(this, user);
      this.profile.fullName = this.profile.firstName + " " + this.profile.lastName;
      this.status = UtilitiesService.toTitleCase(this.status);
      this.lastLogin = UtilitiesService.createReadableDate(this.lastLogin);
      this.toolGroups = processToolGroups(this.toolGroups);
      this.tasks = TaskList.buildTaskListWithData(this.tasks, this._id);
      this.gravatarImgUrl = createGravatarImgUrl(this.gafeEmail);
      this.supportUser = processUserType(this.usersRole.type, 'support');
      this.schoolUser = processUserType(this.usersRole.type, 'school');
      this.school = SchoolsService.getSchoolForUser(this.usersRole, this.schoolUser);
      this.hasGafe = this.gafeEmail;
    }

    User.prototype.patchEditableFields = function(patch) {
      for(var key in this.profile) {
        if (patch.profile[key]) {
          this.profile[key] = patch.profile[key];
        }
      }
      this.profile.fullName = this.profile.firstName + " " + this.profile.lastName;
    }

    var processUserType = function(userRoleType, check) {
      if (check === 'support') {
        if (userRoleType === 'cluster' || userRoleType === 'super_admin') {
          return 1;
        } else {
          return 0;
        }
      } else if (check === 'school') {
        if (userRoleType !== 'cluster' && userRoleType !== 'super_admin') {
          return 1;
        } else {
          return 0;
        }
      }
    }

    var createGravatarImgUrl = function(email) {
      if (!email) {
        email = 'default'
      }
      var gravatarHash = md5.createHash(email);
      return "http://www.gravatar.com/avatar/" + gravatarHash + "?d=monsterid&s=200.jpg";
    }

    var processToolGroups = function(toolGroups) {
      var p = {
        toolGroups: [],
        toolEditor: false,
        toolViewer: false
      };
      return toolGroups.reduce(function(p, c) {
        var group = c.split('@')[0];
        p.toolGroups.push(group);
        if (group.indexOf('_sorter_editor') !== -1 ) {
          p.toolEditor = true;
          p.toolViewer = true;
        } else if (group.indexOf('_sorter_viewer') !== -1 ) {
          p.toolEditor = false;
          p.toolViewer = true;
        }
        return p;
      }, p);
    };

    return User;

  })

  .factory('UserResource', function($resource) {

    return $resource('/assets/data/users/:id',
      {
        id: '@id'
      },
      {
        getUserById: {
          method: 'GET',
          isArray: false
        }
      },
      {
        updateUserById: {
          method: 'PATCH',
          isArray: false
        }
      }
    );

  })

})();
