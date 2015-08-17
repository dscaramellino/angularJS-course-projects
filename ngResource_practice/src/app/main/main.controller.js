(function() {
  'use strict';

  angular.module('template')

  .controller('MainController', function (StudentResource) {
    var self = this;

    var studentResourceObject = StudentResource;

    self.getStudent = function () {

      //USING A CALLBACK
      //myResourceObject.myAction({placeholder: value, queryParm: value})
      //myResourceObject.myAction({...}, if POST or PUT second arg is request body)
      // studentResourceObject.getStudent({id: self.studentId}, null, function(student){
      //   console.log(student)
      //   self.studentName = student.studentDetails.first + " " + student.studentDetails.last;
      // }, function(err) {
      //    console.log(err);
      //});

      //USING A PROMISE
      studentResourceObject.getStudent({id: self.studentId}).$promise
      .then(function (student) {
        self.studentName = student.studentDetails.first + " " + student.studentDetails.last;
      }).catch(function(err) {
        console.log(err);
      });
    }


  });

})();
