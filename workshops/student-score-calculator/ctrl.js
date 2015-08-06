var myApp = angular.module('myApp', ['ServicesModule']);

myApp.controller('myController', function($scope, Student) {
  var ctrl = this;
  ctrl.student = new Student(ctrl.studentName);
  ctrl.addAssignment = function(name, score) {
    ctrl.student.addAssignment(name, score);
    ctrl.studentName = '';
    ctrl.assignmentName = '';
    ctrl.assignmentScore = '';
  }
});
