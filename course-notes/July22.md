## angularJS Directives
https://docs.angularjs.org/api/ng/directive

#### ng-app
```
<html ng-app=”myApp”> This is the stuff that will be compiled by angular</html>
```

#### ng-controller 
```
<html ng-app=”myApp”>
	<body ng-controller=”myController as ctrl”>
	 	<div ng-bind=”ctrl.property”></div>
	</body>
</html>
```

When adding properties to the controller, don't use $scope; instead use this approach:
```javascript 
angular.module('angularjsTutorial').controller('MainCtrl', function () {
	var self = this;
	self.awesomeThings = [];
});
```
#### ng-bind - Used to populate property values in view (one-way data binding)
```
<span ng-bind=”mainCtrl.message”></span>
```

#### ng-click
Expression or function called on click

#### ng-repeat - Used to iterate over arrays and objects

Iterates over arrays:
```
<div ng-repeat="awesomeThing in mainCtrl.awesomeThings">
 <h3>{{awesomeThing.title}}</h3>
</div>
```
Iterates over keys in objects:
```
<div ng-repeat="(key, value) in mainCtrl.awesomeThings">
	<h3>{{key}}</h3>
	<h3>{{value.title}}</h3>
</div>
```
$index
$first
$middle
$last
$even
$odd

#### ng-model - Used to capture user inputs and add them to the controller

Two-way data binding
```
<input type=”text” ng-model=”mainCtrl.message”/>
```
If we don't declare message on the controller, ng-model will add it

#### ng-show ng-hide - Used to condtionally show or hide elements in the DOM

```
<span ng-show=”mainCtrl.propertyIsTruthy”></span>
<span ng-hide=”mainCtrl.propertyIsTruthy”></span>
```

#### ng-if - Used to remove elements from DOM if condition evaluates to false


#### Directives for UI events
ngClick 
ngPaste
ngDblclick 
ngCut
ngMousedown 
ngCopy
ngMouseup 
ngFocus
ngMouseover 
ngBlur
ngMouseenter 
ngSubmit
ngMouseleave 
ngKeypress
ngMousemove 
ngKeyup/ngKeydown













