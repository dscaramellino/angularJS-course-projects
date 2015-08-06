var myApp = angular.module('ServicesModule', []);

myApp.value('PASSING_ALPHA_GRADES', {
  90: 'A',
  80: 'B',
  70: 'C',
  65: 'D',
  0: 'F'
});

myApp.service('Calculate', function(PASSING_ALPHA_GRADES) {
  var self = this;

  self.average = function(assignments) {
    var sumOfScores = assignments.reduce(function(p, c){
      var score = c.score;
      p = p + score;
      return p;
    }, 0);
    var average = sumOfScores ? (sumOfScores / assignments.length).toFixed(2) : 'N/A';
    return average;
  };

  self.alphaGrade = function(average) {
    if (average === 'N/A') return 'N/A';
    var alphaGrade;
    for (var key in PASSING_ALPHA_GRADES) {
      if (average >= key) {
        alphaGrade = PASSING_ALPHA_GRADES[key];
      }
    };
    alphaGrade = alphaGrade || 'N/A';
    return alphaGrade;
  };

  self.passingFlag = function(alphaGrade) {
    var passingFlag = alphaGrade === 'N/A' ? 'N/A' : alphaGrade === 'F' ? 'No' : 'Yes';
    return passingFlag;
  };

});

myApp.factory('Student', function(Calculate) {

  function Student(name) {
    this.name = name;
    this.assignments = [];
    this.average = Calculate.average(this.assignments);
    this.alphaGrade = Calculate.alphaGrade(this.average);
    this.passingFlag = Calculate.passingFlag(this.passingFlag);
  }

  Student.prototype.addAssignment = function(name, score) {
    this.assignments.push({name: name, score: score});
    this.average = Calculate.average(this.assignments);
    this.alphaGrade = Calculate.alphaGrade(this.average);
    this.passingFlag = Calculate.passingFlag(this.passingFlag);
  };

  return Student;
});

