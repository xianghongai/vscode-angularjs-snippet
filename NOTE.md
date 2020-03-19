## NOTE

### Normalization

AngularJS 区分大小写(case-sensitive)，`camelCase`，

HTML 不区分大小写(case-insensitive)，`kebab-case`，

AngularJS  normalization 处理：

1. 忽略 element/attributes 中开头的 `x-` 和 `data-`
2. 将 `:`、`-`、`_` 分隔字符转换为 `camelCase`

JavaScript: `ngModel` ↔ DOM: `ng-model`

### $q constructor

```javascript
// Arguments
$q(resolver:function(function, function)); // Returns a promise

// Methods
$q.defer(); // Returns a deferred
$q.reject(reason:any);
$q.<when|resolve>(<value|promise>, [successCallback], [errorCallback], [progressCallback]);
$q.<all|race>([deferredI.promise, deferredII.promise, deferredIII.promise]);
```

---

```javascript
// I. The Deferred API
function handleAsync() {
  // 1. New instance of deferred
  var deferred = $q.defer();

  // 2. Methods
  deferred.resolve(resultObj); //triggers successCallback
  deferred.reject(reasonObj); //triggers errorCallback
  deferred.notify(progressObj); //triggers progressCallback

  // 3. Properties
  return deferred.promise;
}

// II. The Promise API
handleAsync.then(successCallback, [errorCallback], [notifyCallback]);
handleAsync.then(successCallback).catch(errorCallback).finally(callback, notifyCallback);
```

---

### Controller 与 View 通信：

- 将数据绑在 `$scope` 上，视图中通过表达式解析然后渲染
- 通过 `this` 绑定；`controllerAs` 可用来设置控制器的别名，component 中默认值为 `$ctrl`

---

### [Directive](https://docs.angularjs.org/guide/directive) / [Component](https://docs.angularjs.org/guide/component)

- `compile`: used when we need to modify directive template, like add new expression, append another directive inside this directive，修改 DOM 模板
- `controller`: used when we need to share/reuse $scope data，业务逻辑和 $scope 数据
- `link`: it is a function which used when we need to attach event handler or to manipulate DOM，操作实例化 DOM，绑定事件，交互，属性及$scope的监听

**注意 bind 名的 Normalization**

```javascript
// Directive
module.directive(name, fn:function);

// 限定声明方式 Element, Attribute *, Class, Comment
restrict:'EACM',
// 是否创建隔离作用域
// 1. scope: {}, 不继承隔离： isolate scope，不再继承父作用域中的属性，父作用域给指令传值依赖绑定策略
// 2. scope: true, 继承隔离：继承父作用域，并创建新的子 (child) 作用域，父变子变，子变父不变
// 3. scope: false, 继承不隔离：不创建作用域，使用父作用域，父变子变，子变父变
scope

// 在预链接阶段(pre-linking)之前实例化 controller
controller
// bindToController 是为了新版本 Component 作 migration 用的
bindToController: { // 定义想传入独立作用域的属性，并把它们绑定到 controller 上
  reference_copy: "=?",  // 外部和内部相互改变
  value_copy: "@", // 只能是外部影响内部
  method : "&" // 把内部函数返回值和外部属性绑定
},
controllerAs: 'vm' // 设定别名以在模板中访问
// 不建议用 Controller，directive 只是附加行为能力，不是用以‘组件化’

// 依赖其它指令，将其它指令 Controller 作为第四个参数，注入到当前指令
// (no prefix), 在前元素上找，没找到会报错
// ?, 在前元素上找，没找到，把 `null` 传给 `link`
// ^, 在前元素和它的父上找，没找到会报错
// ?^, 在前元素和它的父上找，没找到，把 `null` 传给 `link`
// ^^, 在它的父上找，没找到会报错
// ?^^, 在它的父上找，没找到，把 `null` 传给 `link`
require

template
templateUrl
transclude

replace // 不要用，已 Deprecated
```

不建议在一个元素上附加太多指令，涉及到各个作用域的组合问题，如 isolated scope + isolated scope  或 isolated scope + child scope 是不会工作的。

```javascript
// Component
module.component(name, options:object);

// 默认创建隔离作用域，使用 bindings 结合绑定策略
bindings: { // 用 bindings 传递父层作用域中属性到 component 中，component 始终是独立作用域
  one_way: '<', // 1.5 版本加入
  two_way: '=',
  value_copy: '@?',
  method: '&'
}
// 默认 $ctrl, 模板中直接访问
controllerAs
require
```

#### Transclusion

`transclude`

---

### AngularJS 概念

AngularJS 需要明白的理念比较少，主要是围绕“特定目标的对象”能“相互协作”展开，它有引导程序(Bootstrap)、模块(Module)、供应者(Provider)、注入器(Injector)、依赖注入(Dependency Injection)、服务(Service)、视图(View)、组件(Component)、模板(Template)、表单(Form)、过滤器(Filter)、指令(Directive)、数据绑定(Data Binding)、表达式(Expression)、控制器(Controller)、模型(Model)、作用域(Scope)、表达式(Expression)、编译器(Compiler)、路由(Router)等概念，见下表：

|                           概念 | 说明                                                                                                                                 |
|-------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------|
|            引导程序(Bootstrap) | 引导不同的模块(Module)                                                                                                               |
|                   模块(Module) | 模块化，功能集，为各组件提供编译上下文环境                                                                                           |
| 依赖注入(Dependency Injection) | 负责创建和自动装载对象或函数                                                                                                         |
|               注入器(Injector) | 用来实现依赖注入(Injection)的容器                                                                                                    |
|               编译器(Compiler) | 用来编译模板(Template)，并且对其中包含的指令(Directive)和表达式(Expression)进行实例化                                                |
|               供应者(Provider) | 提供“特定目标的对象”                                                                                                                 |
|                  服务(Service) | 独立于视图(View)的、可复用的业务逻辑                                                                                                 |
|             控制器(Controller) | 视图(View)背后的业务逻辑                                                                                                             |
|                     视图(View) | 用户看到的内容(DOM)                                                                                                                  |
|                组件(Component) | 可复用的模块                                                                                                                         |
|                 模板(Template) | 带有 Angular 扩展标记的 HTML                                                                                                         |
|                    模型(Model) | 用于显示给用户并且与用户互动的数据                                                                                                   |
|                  作用域(Scope) | 用来存储模型(Model)的语境(context)。模型放在这个作用域中才能被控制器、指令和表达式等访问，`$destroy`，`$on`，`$emit`，`$broadcast`， |
|         数据绑定(Data Binding) | 自动同步模型(Model)中的数据和视图(View)表现，`$digest`，`$apply`，`$watch`，`$observe`                                               |
|             表达式(Expression) | 模板中可以通过它来访问作用域(Scope)中的变量和函数，`$parse`，`$eval`                                                                 |
|                 过滤器(Filter) | 负责格式化表达式(Expression)的值，以便呈现给用户                                                                                     |
|                指令(Directive) | 用于通过自定义属性和元素扩展 HTML 的行为                                                                                             |
|                     表单(Form) | 提供验证服务、数据双向绑定，`$parsers`，`$formatters`                                                                                |

思考一下：哪些是用于组织功能？哪些是容器装载？哪些是功能对象？

结合工程化，Angular.JS 团队及社区还提供了如 animate、cookie、sanitize、localStorage、ui-router、translate 等相关的服务；


### AngularJS 基础

不仅 AngularJS，前端框架大多都会实现一套独立于浏览器的 DOM 系统，以兼顾性能和跨浏览器的兼容性，都会包装 DOM 特性和属性(事件处理)；

因此，尽可能使用框架提供的服务而不是原生(native)服务。

1. DOM 中 插值绑定/interpolation bindings
    - `<span title="{{ attrBinding }}" ng-click="functionExpression()">{{ textBinding }}</span>`，双向绑定, Two-way
    - 表达式一次性绑定(单向绑定, One-way)以 `::` 开头
    - DOM 绑定布尔属性
        + HTML 规范不要求浏览器保留布尔属性的值。插值表达式放入 `disabled="{{isDisabled}}"` 这样的属性中，绑定信息会丢失，因为浏览器会忽略属性值
        + 特殊的 `ng-` 前缀指令：`disabled`, `required`, `selected`, `checked`, `readOnly` , `open`
    - `ngAttr`
        + Web 浏览器有时会忽略属性值，在包含插值标记时可能无法按预期工作，需要 `ngAttr` 指令修复
        + `<circle>`: `ng-attr-cx`,
        + `<select>`: `ng-attr-size`,
        + `<textarea>`: `ng-attr-placeholder`,
        + `<button>`: `ng-attr-type`,
        + `<progress>`: `ng-attr-value`

2. `NgClass`, `ng-class="expression"` or `class="ng-class: expression;"`
    - `ng-class="{strike: deleted, bold: important, 'has-error': error}"`，Map Syntax
    - `ng-class="style"`，String Syntax
    - `ng-class="[style1, style2, style3]"`，Array Syntax
    - `ng-class="[style4, {orange: warning}]"`，Array and Map Syntax
    - `ng-class="$variableToEvaluate ? 'class-if-true' : 'class-if-false'"`，Ternary Operator
    - `ng-class="{'first|last|even|odd': $first|$last|$even|$odd}" ng-repeat="item in items track by $index"`，First, Last or Specific Number

3. 限制访问全局变量、原生事件，如 `window`, `document`, `location`, `setInterval`, `setTimeout`

4. `ng-repeat`, `ng-switch`, `ng-view`, `ng-include`, `ng-if` 会创建独立的作用域

---

### Anti Patterns/反模式

别想着直接操作 DOM，以数据驱动，见下方 **《AngularJS 深度剖析与最佳实践》书摘** 章节。

###  controllers 和 directives 中的事件要卸载

`$scope.$on('$destroy', function() { xxx.off("xxxEvent", handleEvent); })`

### `$scope` functions: `$watch() , $digest(), $apply()`, 与浏览器事件循环交互

AngularJS 接管了所有，包括事件，浏览器 Native 只是一个 Render 受，浏览器(event-loop)只能等待 AngularJS 送达各种指令，作出 用户操作(UI)、 timer event、 network event 等响应；

AngularJS 只能在进入 JavaScript 上下文才能接管；

1. 调用 `$scope.$apply(stimulusFn)` 进入 AngularJS 执行环境(execution context)；`stimulusFn` 可能会修改程序的状态；

2. AngularJS 进入 `$scope.$digest()` loop，这个 loop 由 `$evalAsync` queue 和 `$scope.$watch()` list 两部分组成；

3. 模型稳定，queue 为空(empty)、list 检测无改变(change)；`$scope.$digest()` loop 结束，离开 AngularJS 和 JavaScript 环境，浏览器渲染和反射(reflect)改变；


- `$scope.$apply()`

一般情况下，不需要显示的调用，AngularJS 已经通过处理事件的指令如 `controllers`、`services` 调用了 `$apply`；

AngularJS 对原生异步行为(async behaviors)进行了封装，如 Events(`ng-click`)、Timers(`$interval`, `$timeout`)、XHR(`$http`)；

创建了异步行为的 AngularJS 服务，需要 `$scope.$apply()` 去告知 AngularJS 触发 callback 或 broadcast/emit；

如 `$rootScope.$apply($rootScope.$broadcast('receivedMsg', msg));`，才会生效；


- `$scope.$watch()`, list

当在视图绑定数据到 $scope 对象，AngularJS 会在内部创建一个 ‘watch’ ，以监视 $scope 对象上变量的变化，只是一个声明；


- `$scope.$digest()`, loop

AngularJS 调用 `$digest()` 函数遍历所有 ‘watch’ 检查是否有任何变量已更改，如果监视变量已更改，则调用相应的‘watch’函数，触发数据绑定更新。


```javascript
// Life cycle: Pseudo-Code of $apply()
function $apply(expr) {
  try {
    return $eval(expr);
  } catch (e) {
    $exceptionHandler(e);
  } finally {
    $root.$digest();
  }
}
```

### 通信

模块通过**共用服务**或**基于事件**两种方式进行通信

+ 共用服务: 通过 factory 可以生成一个单例对象，在需要通信的模块 a 和 b 中注入这个对象
+ 基于事件: 在子 controller 中向父 controller 触发( `$emit` )一个事件，然后在父 controller 中监听(`$on`)事件，再广播(`$broadcast`)给子 controller ，这样通过事件携带的参数，实现了数据经过父 controller，在同级 controller 之间传播。

---

### 管理数据与 DOM 之间一对一的关系

`ng-repeat` 提示 `Duplicates in a repeater are not allowed.` 尝试加 `track by $index` 解决；

---

### UI-Router Features

`template`+`controller` or `component`

`abstract: true` 只能被继承，不能直接切换到此 state，否则导航至默认路由；

- States
- Views
- Urls
- Parameters
- Resolve Data
- Transitions
    + From state/to state, `Transition.to()`/`Transition.from()`
    + Exiting and entering, `Transition.entering()`/`Transition.exiting()`
    + Param value changes, `Transition.params('to')`/`Transition.params('from')`
    + Nested states, `Transition.retained()`
    + Transition Triggers, `UISref`, `StateService.go()`, URL changed
- Transition Lifecycle `Create-Before-Start-Exit-Retain-Enter-Finish-Success/Error`

[ui-router Wiki](https://github.com/angular-ui/ui-router/wiki)

---

## 《AngularJS 深度剖析与最佳实践》书摘/(作者：雪狼,破狼,彭洪伟)

### MVVM

MVVM 模式，Model-View-ViewModel (模型-视图-视图模型)，最早出现在微软的 WPF 和 SilverLight 框架中。MVVM 模式利用框架内置的双向绑定技术对 MVP (Model-View-Presenter) 模式变形，它引入了专门的 ViewModel (视图模型)来“粘合” View 和 Model，让 View 和 Model 进一步分离和解耦。

MVVM 模式的要点是：以领域对象 (Domain Model) 为中心，遵循“分离关注点”设计原则，这与 jQuery 的 DOM 驱动思维有显著差异，所以在做 MVVM 开发时应该谨记：

前端开发工程师不要先设计页面，然后用 DOM 操作去改变它。

在以往的 jQuery 开发中，我们会首先设计页面 DOM 结构，然后再利用 jQuery 来改变 DOM 结构或者实现动态交互效果。由于 jQuery 是为 DOM 驱动而设计的，所以对于拥有复杂交互逻辑的项目，JavaScript 代码会变得越来越臃肿，让交互逻辑分散到各处。

在 MVVM 模式框架中，我们要始终在脑子里挂着 Model 的弦。不能老想着“我有×××这个DOM，我要让它做×××变化”，而应该是先思考我们有或需要什么样的 Model 数据，然后设计我们的交互数据和交互逻辑，最后才去实现视图，并用 ViewModel 去粘合它们。

---

### ngular.JS 启动过程

1. 浏览器下载 HTML/CSS/JavaScript
2. 浏览器构建 DOM 树
3. jQuery 初始化
4. AngularJS 初始化(2、3、4、5步任意顺序执行)
    1. 创建 module，作为其它对象的注册表
    2. 注册各种 AngularJS 对象，如 Controller、Service、Directive 等，如 `myModule.controller()` 是 `$controllerProvider.register` 的快捷方式，`myModule.service()` 是 `$provide.service` 的快捷方式，，`myModule.directive()` 是 `$compileProvider.directive` 的快捷方式；
    3. 注册后形成一个由名字和回调函数组成的对照表(并未执行)，
    4. 注册 `config` 回调函数，在模块刚刚初始化时执行
    5. 注册 `run` 回调函数，在模块初始化完毕时执行
5. jQuery 启动
    - 触发 document 对象的 DOMContentLoaded 事件，执行 `jQuery.ready`；执行 Angular 启动代码
6. Angular 启动，
    - 查找 `ng-app` 指令节点，调用 `angular.bootstrap(element, moduleName)`，多个 `ng-app` 启动需手动 `angular.bootstrap` 方式来启动
7. 加载子模块
    - 先前视图和数据模型未建立关联，无法反应数据模型的变动，于此，将之关联
    - 此时，创建注入器(injector)，将其关联到所在节点上
    - 对当前节点所关联的模块及它所依赖的模块进行初始化；注册的 `config` 都会被顺序执行
    - 第 4 步中注册的大多数对象尚未就绪，不能使用，在 `config` 回调函数中能够使用的只有注册的常量(Constant)对象和 Provider 类
    - 这个阶段也是程序中唯一可以直接访问 Provider 类对服务进行配置的地方，如初始路由服务的 Provider，仅负责记录一个 URL 到“模板/控制器”组的映射表，供后面步骤使用
8. 启动子模块
    - 此阶段，各种 Angular 对象可以使用，包括 Service、Factory 等
    - 路由模块获得控制权，使用 `$location` 服务解析当前页面的 URL
    - 根据 URL 查找对应的“模板/控制器”，来准备渲染一个页面
9. 渲染页面
    - 路由模块创建 Scope 对象
    - 加载模板
    - `$compile` 对象解析模板成一个静态 DOM 树，逐个的扫描 DOM 树中的指令
    - 通过指令把 Scope 对象和 DOM 树关联，包括渲染内容的函数和进行事件处理的函数
    - 替换一个特定指令所有的节点，在 ngRoute 中是带有 `ng-view` 的节点，在 angular-ui-router 中是带有 `ui-view` 的节点
10. 数据绑定与摘要循环
    - 页面已经渲染，数据未渲染，使用 Scope 对象中的数据渲染视图
    - 脏检查机制，每一个 Scope 成员变量求出一个摘要值保存在一个变量中，调用 Scope 对象的 `$digest/$apply` 方法时，重新计算一遍摘要值，数据变化则更新视图，如此为“摘要循环”，`$apply` 是对 `$digest` 的包装
    - 挂载第三方组件的事件，需要调用一次 `$apply`
    - 于此，AngularJS 程序启动成功

---

### Provider

用 Service 抽象公共代码，其类型：

-   **常量(Constant)**，声明不会被修改的值
-   **变量(Value)**，声明会被修改的值
-   **服务(Service)**，“把自己的孩子取名为‘孩子’”；与后端领域的“服务”实现方式相似，声明一个类，等待 AngularJS 把它 `new` 出来，然后保存这个实例，供它到处注入
-   **工厂(Factory)**，不会被 `new`，AngularJS 会调用这个函数获得返回值并保存，供它到处注入，取名为“工厂”，是因为：它本身不会被用于注入，使用的是它的产品
-   **供应商(Provider)**，“工厂”只负责生产产品，规格不受控制，而“供应商”更加灵活，可对规格进行配置，以获得定制化的产品

除了 `Constant`，其它类型的服务，都是通过 `Provider` 实现；`Constant` 初始化时机非常早，可在 `config` 函数中使用；

纯数据，用 `Value`；需要添加行为时，用 `Service`；需要通过计算给出结果时，用 `Factory`；需要进行全局配置时，用 `Provider`；

|                    类型 | Factory | Service | Value | Constant | Provider |
|------------------------:|---------|---------|-------|----------|----------|
|          可依赖其它服务   | 是      | 是      | 否    | 否        | 是       |
|      使用类型友好的注入    | 否      | 是      | 是    | 是        | 否       |
|      在 config 阶段可用  | 否       | 否       | 否    | 是        | 是       |
| 可用于创建函数/原生对象    | 是       | 否       | 是    | 是        | 是       |

- 可依赖其它服务
    `Value` 和 `Constant` 的特殊声明形式，没有进行依赖注入的时机。

- 使用类型友好的注入
    `Factory` 可以根据逻辑程序返回不同的数据类型，无法推断其结果是什么类型，对类型不够友好；`Provider` 灵活性比 `Factory` 更高。

- 在 `config` 阶段可用
    只有在 `Constant` 和 `Provider` 类型在 `config` 阶段可用；其它都是 `Provider` 实例化之后的结果，只有在 `config` 阶段完成之后可用。


- 可用于创建函数/原生对象
    Service 是 new 出来的，其结果必然是类实例，无法直接返回一个可供调用的函数或数字等原生对象。

AngularJS 提供 `decorator` 机制用来改变服务的行为，慎用。

---

### ngModel

根据 input/select/textarea 元素上模型的有效性，会有一套 CSS Classes 机制。

---

## 逻辑拆分/(作者：徐飞)

- **Angular 应用最重要的事情是分层**
- **Angular 不良代码症状是 controller 又大又乱**
- 远程请求，数据缓存等等一律放进 service
- 不得以而产生的 DOM 操作，一律放进 directive
- 数据的格式化，一律做成 filter
- controller
    + 视图分块、分层
    + 把 controller 和视图块按照一对一的关系维护，每块单独都能跑，然后拼起来
    + 嵌套的视图，考虑作用域的关系
    + 不要尝试在 $scope 上过多纠缠
- 采用 component 封装组件

---