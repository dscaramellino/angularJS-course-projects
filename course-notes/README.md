# Notes

## July 29th, 2015

### Service components in ng

#### $scope.$watch 

Don't use these:
- $scope.$watch()
- $scope.$watchCollection()
- $scope.$watch(, true) known as a deep watch

#### $timeout
- $timeout(function() {}, when);

#### $interval
- $interval(function() {}, interval length, number of intervals);

