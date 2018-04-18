# polymer-bind-angular
A angular.js TypeScript directive to get the two-way binding between angular components and polymer components without MutationObservers.

This repo is just to publish the solution that i have used to make Polymer work tightly with angular.js. The people behind the [angular-bind-polymer Directive](https://github.com/eee-c/angular-bind-polymer) also got a solution which uses MutationObservers and probably will get updates.

Feel free to use the code in any way. Since angular.js will not be supported past 2021, this repo will not be maintained by myself.

## Usage
```javascript
import PolymerBindDirective from "./polymer-bind-angular";
angular.module('myApp')
       .directive('bindPolymer', ['$parse', PolymerBindDirective]);
       .controller('myCtrl', ['$scope', function ($scope: any) {
          $scope.text = "Controller Text";       
        }])
```
### Angular Controller Variable Binding
```HTML
<div ng-controller="myCtrl">
  WebComp inside controller: 
  <polymer-comp text="{{text}}" bind-polymer></polymer-comp>
  Text from the Controller: {{text}}
</div>
```
Changes to the text attribute inside the polymer comp update the $scope variable of the controller and changes to the controller variable update the polymer comp attribute.

### Angular Component Binding

Template File of the angular component angular-component.html: 
```HTML
<div>
  <polymer-comp text="{{$ctrl.text}}" bind-polymer></polymer-comp>
  <span>Inside angular component: <b>{ {$ctrl.text}}</b></span>
</div>
```

Changes of the components controller variables also update the polymer components attribute and the other way around.
