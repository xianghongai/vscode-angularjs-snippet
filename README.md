# AngularJS Snippet (Visual Studio Code)

## Installation

Link: [AngularJS Snippet - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=NicholasHsiang.vscode-angularjs-snippet)。

or, Command: `ext install nicholashsiang.vscode-angularjs-snippet`

## Snippets

### JavaScript

Note: All the snippets include the final semicolon `;`

```javascript
// Basic

/*
# Simple & IIFE
     ngc / ngController                         // Angular Controller
     ngs / ngService                            // Angular Service
     ngd / ngDirective / ngDirective.Decorator  // Angular Directive
    ngco / ngComponent                          // Angular Component
     ngm / ngModule                             // Angular module
   ngcon / ngConfig                             // Angular Config
 ngconst / ngConstant                           // Angular Constant
         / ngDecorator                          // Angular Decorator
    ngfa / ngFactory                            // Angular Factory
     ngf / ngFilter                             // Angular Filter
         / ngProvider                           // Angular provider
     ngr / ngRun                                // Angular Run
*/

// Simple: ngc ↵
.controller('nameCtrl', ['$scope', 'nameService', function ($scope, nameService) {

}])


// IIFE: ngController  ↵
(function () {
  'use strict';

  angular
    .module('name')
    .controller('nameCtrl', nameCtrl)

  nameCtrl.$inject = ['$scope'];

  function nameCtrl($scope) {
    var $ctrl = this;

  }

}());
```

```javascript
// ------------------------ ngForm

ngForm.
  // property
    .$pristine
    .$dirty
    .$valid
    .$invalid
    .$submitted
    .$pending
    .$error
  // method
    .$rollbackViewValue()
    .$commitViewValue()
    .$addControl()
    .$getControls()
    .$removeControl()
    .$setDirty()
    .$setPristine()
    .$setUntouched()
    .$setSubmitted()
    .$setValidity()

// ------------------------ ngModel

ngModel
  // property
    .$viewValue
    .$modelValue
    .$parsers
    .$formatters
    .$validators
    .$asyncValidators
    .$viewChangeListeners
    .$error
    .$pending
    .$untouched
    .$touched
    .$pristine
    .$dirty
    .$valid
    .$invalid
    .$name
  // method
    .$render()
    .$isEmpty()
    .$setPristine()
    .$setDirty()
    .$setUntouched()
    .$setTouched()
    .$rollbackViewValue()
    .$validate()
    .$commitViewValue()
    .$setViewValue()
    .$overrideModelOptions()
    .$processModelValue()
    .$setValidity()

// ------------------------ ngScope

ngScope
  // property
    .$id
    .$parent
    .$root
  // method
    .$new()
    .$watch()
    .$watchGroup()
    .$watchCollection()
    .$digest()
    .$suspend()
    .$isSuspended()
    .$resume()
    .$destroy()
    .$eval()
    .$evalAsync()
    .$apply()
    .$applyAsync()
    .$on()
    .$emit()
    .$broadcast()

    // ngsp / ngScope.property
    $scope.key = value;
    // ngsm / ngScope.method
    $ctrl.fn = function () { };

    // ngcp / ngCtrl.property
    $ctrl.key = value;
    // ngcm / ngCtrl.method
    $ctrl.fn = function () { };

    // ngrootScope/ngrScope
    $rootScope.key = value;

    // ngEmit
    $scope.onEmitEvent = function () {
      $scope.$emit('EMIT_EVENT_NAME', params);
    };

    // ngBroadcast
    $scope.onBroadcastEvent = function () {
      $scope.$broadcast('BROADCAST_EVENT_NAME', params);
    };

    // ngOn
    var clearListener = $scope.$on('EVENT_NAME', function (event, params) {

    });

    // ngWatch
    var clearWatch = $scope.$watch('watchExpression', function(newValue, oldValue) {

    });

    // ngWatchGroup
    var clearWatch = $scope.$watchGroup(['watchExpressions'], function(newValue, oldValue) {

    });

    // ngWatchCollection
    var clearWatch = $scope.$watchCollection('watchExpression', function(newCollection, oldCollection) {

    });

// ------------------------ ngAttr
ngAttr
  .$normalize()
  .$addClass()
  .$removeClass()
  .$updateClass()
  .$observe()
  .$set()

// ------------------------ ngSce (Strict Contextual Escaping)
ngSce.
  .isEnabled()
  .parseAs()
  .trustAs()
  .trustAsHtml()
  .trustAsCss()
  .trustAsUrl()
  .trustAsResourceUrl()
  .trustAsJs()
  .getTrusted()
  .getTrustedHtml()
  .getTrustedCss()
  .getTrustedUrl()
  .getTrustedResourceUrl()
  .getTrustedJs()
  .parseAsHtml()
  .parseAsCss()
  .parseAsUrl()
  .parseAsResourceUrl()
  .parseAsJs()
```

```javascript
// uiRouter
ngState
  .get()
  .includes()
  .is()
  .reload()
  .transitionTo()
  .otherwise()
  .when();

// ngState ↵
var stateName = {
  name: "state",
  url: "path/:id?query",
  params: {
    param: null
  },
  templateUrl: "template.html",
  controller: "Controller as $ctrl"
};

// ngState.component ↵
var stateName = {
  name: "state",
  url: "url",
  component: "component",
  resolve: {
    obj: [
      "$stateParams",
      "depService",
      function($stateParams, depService) {
        return depService.getResources($stateParams.id);
      }
    ]
  }
};

// ngState.resolve ↵
var stateName = {
  name: "state",
  url: "path/:id?query",
  templateUrl: "template.html",
  controller: "Controller as $ctrl",
  resolve: {
    obj: [
      "$stateParams",
      "depService",
      function($stateParams, depService) {
        return depService.getResources($stateParams.id);
      }
    ]
  }
};
```

```javascript
// $q

// ngq  ↵
// ngq.es6  ↵
// ngqAll  ↵
// ngqRace  ↵
```

```javascript
// ngAjax

// $$api  ↵ A complete AJAX package

// api  ↵

// apiRequest  ↵
// apiPost  ↵
// apiPut  ↵
// apiPatch  ↵
// apiDelete  ↵
// apiHead  ↵
// apiJSONP  ↵

// apiGet  ↵
function getResource(config) {
  var url = '';
  return $$api.get(url, config);
}

// $http

// ngHTTP  ↵
// ngHTTPPost  ↵
// ngHTTPPut  ↵
// ngHTTPPatch  ↵
// ngHTTPDelete  ↵
// ngHTTPHead  ↵
// ngHTTPJSONP  ↵

// ngHTTPGet  ↵
var deferred = $q.defer();
$http.get("url", config).then(
  function(response) {
    deferred.resolve(response);
  },
  function(error) {
    deferred.reject(error);
  }
);
return deferred.promise;
```

```javascript
// Chore

$element.on("$destroy", function() {
  // clearWatch();
  // clearListener();
  $element.off("event", handleEvent);
  $scope.$destroy();
});

$scope.$on("$destroy", function() {
  // clearWatch();
  // clearListener();
  $element.off("event", handleEvent);
});
```

---

### HTML

```html
<!-- Directive -->
ng-app
ng-controller
ng-init
ng-include

ng-cut
ng-copy
ng-paste

ng-bind
ng-bind-html
ng-bind-template
ng-non-bindable

ng-href
ng-src
ng-srcset

ng-style
ng-class
ng-class-even
ng-class-odd

ng-cloak
ng-csp

ng-show
ng-hide
ng-if

ng-ref
ng-model
ng-model-options
ng-options
ng-value
ng-pattern
ng-list
ng-open
ng-pluralize
ng-selected
ng-required
ng-checked
ng-disabled
ng-readonly
ng-maxlength
ng-minlength

ng-click
ng-submit
ng-dblclick
ng-change
ng-focus
ng-blur
ng-on-event-name

ng-keydown
ng-keypress
ng-keyup

ng-mousedown
ng-mouseenter
ng-mouseleave
ng-mousemove
ng-mouseover
ng-mouseup

ng-swipe-left
ng-swipe-right

ng-repeat
ng-repeat-objects
ng-repeat-start
ng-repeat-end
ng-switch-on
ng-switch-when
ng-switch-default

ng-messages
ng-messages-include
ng-message
ng-message-exp
ng-message-default

<!-- Template -->
ng-message(tpl)
ngTemplate

<!-- Input -->
ngInput
  .checkbox
  .date
  .email
  .month
  .number
  .radio
  .text
  .time
  .url
  .week

<!-- uiRouter -->
uisref/ngsref
uisref.active
uisref.active.abstract
uiview

<!-- translate -->
ngtranslate/ngi18n
```

---

### CSS

```css
.ng-valid {
}
.ng-invalid {
}
.ng-valid-key {
}
.ng-invalid-key {
}
.ng-pristine {
}
.ng-dirty {
}
.ng-touched {
}
.ng-untouched {
}
.ng-pending {
}
.ng-empty {
}
```

---

## Thanks to

- [John Papa AngularJS style guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md).
- [Alexander Sage](https://github.com/sagea/vscode-angular1-snippets)
- [Angular UI](https://angular-ui.github.io/)

BY: xianghongai@gmail.com