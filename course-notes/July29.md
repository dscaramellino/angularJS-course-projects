# July 29th, 2015

## Service components in ng

### $scope.$watch - Do Not Use!
- $scope.$watch()
- $scope.$watchCollection()
- $scope.$watch(, true) known as a deep watch

### $timeout
- $timeout(function() {}, when);

### $interval
- $interval(function() {}, interval length, number of intervals);

## Writing custom services

All model classes are custom services

### Dependency Injection (DI)

Finds and injects services into your controller

Two ways to approach DI:

1. `.controller('MyController', function($scope, $timeout) {});`
1. `.controller('MyController', ["$scope", "$timeout", function(s, t) {}]);`

What goes in your Controller:

- Handle click events
- Get and present data for the View

What goes in your Custom Services (aka the Model):

- Business logic
- Server communication
- Shared state - things that need access across controllers
- Caching
- Factories
- Third-party javascript libraries

### File organization

- One file for your controller
- One file for your services
- One file for your view

Two approaches to making files talk

1. Create another module and make it a dependency
1. Give the secondary module the same name as the primary module; don't include array as second argument when defining secondary module

**Approach 1:**
in File A: `var myApp = angular.module('Primary Module', ['Secondary Module']);`
in File B: `var myApp = angular.module('Secondary Module', []);`

then, in your html file make sure your File B `<script>` tag is before your File A `<script>` tag because file A is expecting file B to exist when it loads

**Approach 2:**
in File A: `var myApp = angular.module('Primary Module', []);`
in File B: `var myApp = angular.module('Primary Module');`

then, in your html file make sure your File A `<script>` tag is before your File B `<script>` tag because the seconday module is dependent on the primary module

### Custom Services

#### Value

- store a value and retrieve it at run time

```javascript
myApp.value('MY_FOLDERS', {});

myApp.controller('MyController', function(MY_FOLDERS) {
	var self = this; 
	self.myFolders = angular.copy(MY_FOLDERS);
});
```

- `MY_FOLDERS` is now available to any controller you pass it in to
- Changes to `MY_FOLDERS` in one controller affect all controllers unless you use a deep copy
- Deep copy: `angular.copy();`

#### Factory

- Must have a return statement

```javascript
myApp.factory('Car', {
	
	function Car(make, model) {
		this.make = make;
		this.model = model;
	}

	Car.prototype.setYear = function(year) {
		this.year = year;
	}

});

myApp.controller('MyController', function(Car) {
	var car1 = new Car('Honda', 'Accord');
});
```






