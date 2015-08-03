var myApp = angular.module('myApp', []);

myApp.controller('myController', function() {
  var ctrl = this;

  ctrl.selectedTheme = "None";
  ctrl.fileName = undefined;
  ctrl.selectedFolder = undefined;
  ctrl.hideFiles = false;
  ctrl.themesArr = ["None", "Primary", "Info", "Success", "Warning", "Danger"];
  ctrl.themesObj = {
    "None": undefined,
    "Primary": "bg-primary",
    "Info": "bg-info",
    "Success": "bg-success",
    "Warning": "bg-warning",
    "Danger": "bg-danger"
  };
  ctrl.foldersObj = {
    "Personal": [],
    "Work": [],
    "Trips": []
  };
  ctrl.addFile = function() {
    if (ctrl.fileName&&ctrl.selectedFolder) {
      ctrl.foldersObj[ctrl.selectedFolder].push(ctrl.fileName);
      ctrl.fileName = undefined;
      ctrl.selectedFolder = undefined;
    }
  }
});
