# AngularJS Snippet (Visual Studio Code)

Using [John Papa AngularJS style guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md).

## Snippets

Note: All the snippets include the final semicolon `;`

```bash
# Simple & IIFE
     ngc / ngController                         // Angular Controller
     ngs / ngService                            // Angular Service
     ngd / ngDirective / ngDirective.Decorator  // Angular Directive
    ngco / ngcomponent                          // Angular Component
     ngm / ngModule                             // Angular module
   ngcon / ngconfig                             // Angular Config
 ngconst / ngconstant                           // Angular Constant
         / ngDecorator                          // Angular Decorator
    ngfa / ngFactory                            // Angular Factory
     ngf / ngFilter                             // Angular Filter
         / ngProvider                           // Angular provider
     ngr / ngRun                                // Angular Run
```

```javascript
// Simple: ngc ↵
.controller('nameCtrl', ['$scope', 'nameService', function ($scope, nameService) {

}])


// IIFE: ngcontroller  ↵
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

---

```
ngstate                  // UI-Router States
ngstateresove            // UI-Router States(Resove)
ngstatecomponent         // UI-Router States(Component)
uiviews                  // multiple named views
ngstatepath              // Path
ngstatequery             // Query string
ngstatenonurl            // Non-url
ngstatego / nggo         // $state.go
uisref/sref              // ui-sref
uisrefactive/srefactive  // ui-sref ui-sref-active
uisrefparams/srefparams  // ui-sref take params
```

---

```
ngRequestData          // Angular Service return a $$api.request promise
ngGetData              // Angular Service return a $$api.get promise
ngPostData             // Angular Service return a $$api.post promise
ngPutData              // Angular Service return a $$api.put promise
ngPatchData            // Angular Service return a $$api.patch promise
ngDeleteData           // Angular Service return a $$api.delete promise
ngHeadData             // Angular Service return a $$api.head promise
ngJSONPData            // Angular Service return a $$api.jsonp promise
ngResponse/ngCallAjax  // Angular Controller calls service promise
```

---

```
ngAJAX     // Angular AJAX, $$api
ngRequest  // Angular $$api.request()
ngGet      // Angular $$api.get()
ngPost     // Angular $$api.post()
ngPut      // Angular $$api.put()
ngPatch    // Angular $$api.patch()
ngDelete   // Angular $$api.delete()
ngHead     // Angular $$api.head()
ngJSONP    // Angular $$api.jsonp()
```

---

```
ngq           // Angular $q()
ngqAll        // Angular $q.all()
ngqRace       // Angular $q.race()
ngHTTP        // Angular $http()
ngHTTPGet     // Angular $http.get()
ngHTTPPost    // Angular $http.post()
ngHTTPPut     // Angular $http.put()
ngHTTPPatch   // Angular $http.patch()
ngHTTPDelete  // Angular $http.delete()
ngHTTPHead    // Angular $http.head()
ngHTTPJSONP   // Angular $http.jsonp()
```

---

```
ngScope               // $scope
ngCtrl                // $ctrl
ngWatch               // $watch, $watchGroup, $watchCollection
ngRootScope/ngrScope  // $rootScope
ngTranslate/ngi18n    // {{'${I18N}'|translate}}
ngEmit                // $emit
ngBroadcast           // $broadcast
ngOn                  // $on
ngOff/ngDestroy       // $destroy
ngto                  // $timeout
```

---

- Thanks to [Alexander Sage](https://github.com/sagea/vscode-angular1-snippets)