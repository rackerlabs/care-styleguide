# CARE Style Guide

A comprehensive coding style guide for developing web apps using Typescript, React, and JSX

## TypeScript

  1. [Types](#types)
  1. [References](#references)
  1. [Objects](#objects)
  1. [Arrays](#arrays)
  1. [Destructuring](#destructuring)
  1. [Strings](#strings)
  1. [Functions](#functions)
  1. [Arrow Functions](#arrow-functions)
  1. [Constructors](#constructors)
  1. [Modules](#modules)
  1. [Iterators and Generators](#iterators-and-generators)
  1. [Properties](#properties)
  1. [Variables](#variables)
  1. [Hoisting](#hoisting)
  1. [Comparison Operators & Equality](#comparison-operators-equality)
  1. [Blocks](#blocks)
  1. [Comments](#comments)
  1. [Whitespace](#whitespace)
  1. [Line Length](#line-length)
  1. [Commas](#commas)
  1. [Semicolons](#semicolons)
  1. [Type Casting & Coercion](#type-casting-coercion)
  1. [Null vs. Undefined](#null-vs-undefined)
  1. [Naming Conventions](#naming-conventions)
  1. [Accessors](#accessors)
  1. [Events](#events)
  1. [jQuery](#jquery)
  1. [Type Annotations](#type-annotations)
  1. [Interfaces](#interfaces)
  1. [Organization](#organization)
  1. [Files](#files)
  1. [Browser Compatibility](#browser-compatibility)
  1. [ECMAScript 5 Compatibility](#ecmascript-5-compatibility)
  1. [ECMAScript 6 Styles](#ecmascript-6-styles)
  1. [Typescript 1.5 Styles](#typescript-1.5-styles)
  1. [Formatting](#formatting)
  1. [License](#license)


## Types

  - **Primitives**: When you access a primitive type you work directly on its value.

    + `string`
    + `number`
    + `boolean`
    + `null`
    + `undefined`

    ```ts
    const foo = 1;
    let bar = foo;

    bar = 9;

    console.log(foo, bar); // => 1, 9
    ```

  - **Complex**: When you access a complex type you work on a reference to its value.

    + `object`
    + `array`
    + `function`

    ```ts
    const foo = [1, 2];
    const bar = foo;

    bar[0] = 9;

    console.log(foo[0], bar[0]); // => 9, 9
    ```

**[⬆ back to top](#table-of-contents)**


## References

  - [TS 2.01](#ts-0201)<a name='ts-0201'></a> - Use `const` for all of your references; avoid using `var`.

    > Why? This ensures that you can't reassign your references (mutation), which can lead to bugs and difficult to comprehend code.

    ```ts
    // bad
    var a = 1;
    var b = 2;

    // good
    const a = 1;
    const b = 2;
    ```

  - [TS 2.02](#ts-0202)<a name='ts-0202'></a> - If you must mutate references, use `let` instead of `var`.

    > Why? `let` is block-scoped rather than function-scoped like `var`.

    ```ts
    // bad
    var count = 1;
    if (true) {

      count += 1;

    }

    // good
    let count = 1;
    if (true) {

      count += 1;

    }
    ```

  - [TS 2.03](#ts-0203)<a name='ts-0203'></a> - Note that both `let` and `const` are block-scoped.

    ```ts
    // const and let only exist in the blocks they are defined in.
    {
      let a = 1;
      const b = 1;
    }
    console.log(a); // ReferenceError
    console.log(b); // ReferenceError
    ```

**[⬆ back to top](#table-of-contents)**


## Objects

  - [TS 3.01](#ts-0301)<a name='ts-0301'></a> - Use the literal syntax for object creation.

    ```ts
    // bad
    const item = new Object();

    // good
    const item = {};
    ```

  - [TS 3.02](#ts-0302)<a name='ts-0302'></a> - Don't use [reserved words](http://es5.github.io/#x7.6.1) as keys. It won't work in IE8. [More info](https://github.com/airbnb/javascript/issues/61).

    ```ts
    // bad
    const superman = {
      default: { clark: 'kent' },
      private: true,
    };

    // good
    const superman = {
      defaults: { clark: 'kent' },
      hidden: true,
    };
    ```

  - [TS 3.03](#ts-0303)<a name='ts-0303'></a> - Use readable synonyms in place of reserved words.

    ```ts
    // bad
    const superman = {
      class: 'alien',
    };

    // bad
    const superman = {
      klass: 'alien',
    };

    // good
    const superman = {
      type: 'alien',
    };
    ```

  <a name="es6-computed-properties"></a>

  - [TS 3.04](#ts-0304)<a name='ts-0304'></a> - Use computed property names when creating objects with dynamic property names.

    > Why? They allow you to define all the properties of an object in one place.

    ```ts
    const getKey = function(k) {

      return `a key named ${k}`;

    }

    // bad
    const obj = {
      id: 5,
      name: 'San Francisco',
    };
    obj[getKey('enabled')] = true;

    // good
    const obj = {
      id: 5,
      name: 'San Francisco',
      [getKey('enabled')]: true,
    };
    ```

  <a name="es6-object-shorthand"></a>

  - [TS 3.05](#ts-0305)<a name='ts-0305'></a> - Use arrow functions for object methods instead of shorthand properties or an anonymous function.

    ```ts
    // bad
    const atom = {
      value: 1,
      addValue: function (value) {
        return atom.value + value;
      },
    };

    // bad
    const atom = {
      value: 1,
      addValue(value) {
        return atom.value + value;
      },
    };

    // good
    const atom = {
      value: 1,
      addValue: (value) => atom.value + value
    };
    ```

  <a name="es6-object-concise"></a>

  - [TS 3.06](#ts-0306)<a name='ts-0306'></a> - Use property value shorthand.

    > Why? It is shorter to write and descriptive.

    ```ts
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
      lukeSkywalker: lukeSkywalker,
    };

    // good
    const obj = {
      lukeSkywalker,
    };
    ```

  - [TS 3.07](#ts-0307)<a name='ts-0307'></a> - Group your shorthand properties at the beginning of your object declaration.

    > Why? It's easier to tell which properties are using the shorthand.

    ```ts
    const anakinSkywalker = 'Anakin Skywalker';
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
      episodeOne: 1,
      twoJedisWalkIntoACantina: 2,
      lukeSkywalker,
      episodeThree: 3,
      mayTheFourth: 4,
      anakinSkywalker,
    };

    // good
    const obj = {
      lukeSkywalker,
      anakinSkywalker,
      episodeOne: 1,
      twoJedisWalkIntoACantina: 2,
      episodeThree: 3,
      mayTheFourth: 4,
    };
    ```

**[⬆ back to top](#table-of-contents)**


## Arrays

  - [TS 4.01](#ts-0401)<a name='ts-0401'></a> - Use the literal syntax for array creation.

    ```ts
    // bad
    const items = new Array();

    // good
    const items = [];
    ```

  - [TS 4.02](#ts-0402)<a name='ts-0402'></a> - Use Array#push instead of direct assignment to add items to an array.

    ```ts
    const someStack = [];

    // bad
    someStack[someStack.length] = 'abracadabra';

    // good
    someStack.push('abracadabra');
    ```

  <a name="es6-array-spreads"></a>

  - [TS 4.03](#ts-0403)<a name='ts-0403'></a> - Use array spreads `...` to copy arrays.

    ```ts
    // bad
    const len = items.length;
    const itemsCopy = [];
    let i;

    for (i = 0; i < len; i++) {
      itemsCopy[i] = items[i];
    }

    // good
    const itemsCopy = [...items];
    ```

  - [TS 4.04](#ts-0404)<a name='ts-0404'></a> - To convert an array-like object to an array, use Array#from.

    ```ts
    const foo = document.querySelectorAll('.foo');
    const nodes = Array.from(foo);
    ```

  - [TS 4.05](#ts-0405)<a name='ts-0405'></a> - Annotate arrays as `foos: Foo[]` instead of `foos:Array<foo>`

    > Why? Easier to read. Used by the TypeScript team. Makes it easier to know item is an array as most devs are conditioned to detect [].

    ```ts
    // bad
    const foos: Array<Foo> = [ Foo1, Foo2 ];

    // good
    const foos: Foo[] = [ Foo1, Foo2 ];
    ```

**[⬆ back to top](#table-of-contents)**


## Destructuring

  - [TS 5.01](#ts-0501)<a name='ts-0501'></a> - Use object destructuring when accessing and using multiple properties of an object.

    > Why? Destructuring saves you from creating temporary references for those properties.

    ```ts
    // bad
    const getFullName = function(user) {

      const firstName = user.firstName;
      const lastName = user.lastName;

      return `${firstName} ${lastName}`;

    }

    // good
    const getFullName = function(obj) {

      const { firstName, lastName } = obj;
      return `${firstName} ${lastName}`;

    }

    // best
    const getFullName = function({ firstName, lastName }) {

      return `${firstName} ${lastName}`;

    }
    ```

  - [TS 5.02](#ts-0502)<a name='ts-0502'></a> - Use array destructuring.

    ```ts
    const arr = [1, 2, 3, 4];

    // bad
    const first = arr[0];
    const second = arr[1];

    // good
    const [first, second] = arr;
    ```

  - [TS 5.03](#ts-0503)<a name='ts-0503'></a> - Use object destructuring for multiple return values, not array destructuring.

    > Why? You can add new properties over time or change the order of things without breaking call site

    ```ts
    // bad
    const processInput = function(input) {

      // then a miracle occurs
      return [left, right, top, bottom];

    }

    // the caller needs to think about the order of return data
    const [left, __, top] = processInput(input);

    // good
    const processInput = function(input) {

      // then a miracle occurs
      return { left, right, top, bottom };

    }

    // the caller selects only the data they need
    const { left, right } = processInput(input);
    ```

**[⬆ back to top](#table-of-contents)**


## Strings

  - [TS 6.01](#ts-0601)<a name='ts-0601'></a> - Use single quotes `''` for all strings, and use double-quotes `""` for strings within strings.

    ```ts
    // bad
    const greeting = "Hello World!";

    // good
    const greeting = 'Hello World!';

    // bad
    let html = "<div class='bold'>Hello World</div>";

    // bad
    let html = '<div class=\'bold\'>Hello World</div>';

    // good
    let html = '<div class="bold">Hello World</div>';
    ```

  - [TS 6.02](#ts-0602)<a name='ts-0602'></a> - Strings longer than 80 characters should be written across multiple lines using string concatenation.

  - [TS 6.03](#ts-0603)<a name='ts-0603'></a> - Note: If overused, long strings with concatenation could impact performance. [jsPerf](http://jsperf.com/ya-string-concat) & [Discussion](https://github.com/airbnb/javascript/issues/40).

    ```ts
    // bad
    const errorMessage = 'This is a super long error that was thrown because of Batman. If you were to stop to think about how Batman had anything to do with this, you would get nowhere fast.';

    // bad
    const errorMessage = 'This is a super long error that was thrown because \
    of Batman. If you were to stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // good
    const errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';
    ```

  <a name="es6-template-literals"></a>

  - [TS 6.04](#ts-0604)<a name='ts-0604'></a> - When programmatically building up strings, use template strings instead of concatenation.

    > Why? Template strings give you a readable, concise syntax with proper newlines and string interpolation features.

    ```ts
    // bad
    const sayHi = function(name) {

      return 'How are you, ' + name + '?';

    }

    // bad
    const sayHi = function(name) {

      return ['How are you, ', name, '?'].join();

    }

    // good
    const sayHi = function(name) {

      return `How are you, ${name}?`;

    }
    ```

**[⬆ back to top](#table-of-contents)**


## Functions

  - [TS 7.01](#ts-0701)<a name='ts-0701'></a> - Use function expressions instead of function declarations.

    > Why? Badly placed Function Declarations are misleading and there are few (if any) situations where you can’t use a Function Expression assigned to a variable instead. See [function-declarations-vs-function-expressions](https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/).

    ```ts
    // bad
    function foo() {
    }

    // good
    const foo = function() {
    };

    const foo = () => {
    };
    ```

  - [TS 7.02](#ts-0702)<a name='ts-0702'></a> - Function expressions:

    ```ts
    // immediately-invoked function expression (IIFE)
    (() => {
      console.log('Welcome to the Internet. Please follow me.');
    })();
    ```

  - [TS 7.03](#ts-0703)<a name='ts-0703'></a> - Never declare a function in a non-function block (if, while, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears.

  - [TS 7.04](#ts-0704)<a name='ts-0704'></a> - **Note:** ECMA-262 defines a `block` as a list of statements. A function declaration is not a statement. [Read ECMA-262's note on this issue](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97).

    ```ts
    // bad
    if (currentUser) {

      const test = function() {

        console.log('Nope.');

      }

    }

    // good
    let test;
    if (currentUser) {

      test = () => {

        console.log('Yup.');

      };

    }
    ```

  - [TS 7.05](#ts-0705)<a name='ts-0705'></a> - Never name a parameter `arguments`. This will take precedence over the `arguments` object that is given to every function scope.

    ```ts
    // bad
    const nope = function(name, options, arguments) {
      // ...stuff...
    }

    // good
    const yup = function(name, options, args) {
      // ...stuff...
    }
    ```

  <a name="es6-rest"></a>

  - [TS 7.06](#ts-0706)<a name='ts-0706'></a> - Never use `arguments`, opt to use rest syntax `...` instead.

    > Why? `...` is explicit about which arguments you want pulled. Plus rest arguments are a real Array and not Array-like like `arguments

    ```ts
    // bad
    const concatenateAll = function() {

      const args = Array.prototype.slice.call(arguments);
      return args.join('');

    }

    // good
    const concatenateAll = function(...args) {

      return args.join('');

    }
    ```
  <a name="es6-default-parameters"></a>

  - [TS 7.07](#ts-0707)<a name='ts-0707'></a> - Use default parameter syntax rather than mutating function arguments.

    ```ts
    // bad
    const handleThings = function(opts) {
      // No! We shouldn't mutate function arguments.
      // Double bad: if opts is falsy it'll be set to an object which may
      // be what you want but it can introduce subtle bugs.
      opts = opts || {};
      // ...
    }

    // bad
    const handleThings = function(opts) {

      if (opts === void 0) {

        opts = {};

      }
      // ...
    }

    // good
    const handleThings = function(opts = {}) {
      // ...
    }
    ```

  - [TS 7.08](#ts-0708)<a name='ts-0708'></a> - Avoid side effects with default parameters

    > Why? They are confusing to reason about.

    ```ts
    var b = 1;

    // bad
    const count = function(a = b++) {

      console.log(a);

    }
    count();  // 1
    count();  // 2
    count(3); // 3
    count();  // 3
    ```

**[⬆ back to top](#table-of-contents)**


## Arrow Functions

  - [TS 8.01](#ts-0801)<a name='ts-0801'></a> - When you must use function expressions (as when passing an anonymous function), use arrow function notation.

    > Why? It creates a version of the function that executes in the context of `this`, which is usually what you want, and is a more concise syntax.

    > Why not? If you have a fairly complicated function, you might move that logic out into its own function declaration.

    ```ts
    // bad
    [1, 2, 3].map(function (x) {

      return x * x;

    });

    // good
    [1, 2, 3].map((x) => {

      return x * x;

    });

    // good
    [1, 2, 3].map((x) => x * x;);
    ```

  - [TS 8.02](#ts-0802)<a name='ts-0802'></a> - If the function body fits on one line and there is only a single argument, feel free to omit the braces and parentheses, and use the implicit return. Otherwise, add the parentheses, braces, and use a `return` statement.

    > Why? Syntactic sugar. It reads well when multiple functions are chained together.

    > Why not? If you plan on returning an object.

    **Good**
    ```ts
    [1, 2, 3].map(x => x * x);

    // good
    [1, 2, 3].reduce((total, n) => {
      return total + n;
    }, 0);
    ```

**[⬆ back to top](#table-of-contents)**


## Constructors

  - [TS 9.01](#ts-0901)<a name='ts-0901'></a> - Always use `class`. Avoid manipulating `prototype` directly.

    > Why? `class` syntax is more concise and easier to reason about.

    ```ts
    // bad
    function Queue(contents = []) {

      this._queue = [...contents];

    }

    Queue.prototype.pop = function() {

      const value = this._queue[0];
      this._queue.splice(0, 1);
      return value;

    }

    // good
    class Queue {

      constructor(contents = []) {

        this._queue = [...contents];

      }

      pop() {

        const value = this._queue[0];
        this._queue.splice(0, 1);
        return value;

      }

    }
    ```

  - [TS 9.02](#ts-0902)<a name='ts-0902'></a> - Use `extends` for inheritance.

    > Why? It is a built-in way to inherit prototype functionality without breaking `instanceof`.

    ```ts
    // bad
    const inherits = require('inherits');

    function PeekableQueue(contents) {

      Queue.apply(this, contents);

    }

    inherits(PeekableQueue, Queue);

    PeekableQueue.prototype.peek = function() {

      return this._queue[0];

    }

    // good
    class PeekableQueue extends Queue {

      peek() {

        return this._queue[0];

      }

    }
    ```

  - [TS 9.03](#ts-0903)<a name='ts-0903'></a> - Methods can return `this` to help with method chaining.

    ```ts
    // bad
    Jedi.prototype.jump = function() {

      this.jumping = true;
      return true;

    };

    Jedi.prototype.setHeight = function(height) {

      this.height = height;

    };

    const luke = new Jedi();
    luke.jump(); // => true
    luke.setHeight(20); // => undefined

    // good
    class Jedi {

      jump() {

        this.jumping = true;
        return this;

      }

      setHeight(height) {

        this.height = height;
        return this;

      }

    }

    const luke = new Jedi();

    luke.jump()
      .setHeight(20);
    ```

  - [TS 9.04](#ts-0904)<a name='ts-0904'></a> - It's okay to write a custom toString() method, just make sure it works successfully and causes no side effects.

    ```ts
    class Jedi {

      contructor(options = {}) {

        this.name = options.name || 'no name';

      }

      getName() {

        return this.name;

      }

      toString() {

        return `Jedi - ${this.getName()}`;

      }

    }
    ```

  - [TS 9.05](#ts-0905)<a name='ts-0905'></a> - Typescript classes placeholder.

**[⬆ back to top](#table-of-contents)**


## Modules

  - [TS 10.01](#ts-1001)<a name='ts-1001'></a> - Use modules (`import`/`export`) over a non-standard module system.

    > Why? Modules are the future, let's start using the future now.

    ```ts
    // bad
    const AirbnbStyleGuide = require('./AirbnbStyleGuide');
    module.exports = AirbnbStyleGuide.es6;

    // ok
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    export default AirbnbStyleGuide.es6;

    // good
    import { es6 } from './AirbnbStyleGuide';
    export default es6;
    ```

  - [TS 10.02](#ts-1002)<a name='ts-1002'></a> - And do not export directly from an import.

    > Why? Although the one-liner is concise, having one clear way to import and one clear way to export makes things consistent.

    ```ts
    // bad
    // filename es6.js
    export { es6 as default } from './airbnbStyleGuide';

    // good
    // filename es6.js
    import { es6 } from './AirbnbStyleGuide';
    export default es6;
    ```

  - [TS 10.03](#ts-1003)<a name='ts-1003'></a> - Use TypeScript module import for non-ES6 libraries with type definitions. Check [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) for available type definition files.

    > Why? This provides type information from external modules when available

    ```ts
    // bad
    /// <reference path="lodash/lodash.d.ts" />
    var lodash = require('lodash')

    // good
    /// <reference path="lodash/lodash.d.ts" />
    import lodash = require('lodash')
    ```

  - [TS 10.04](#ts-1004)<a name='ts-1004'></a> - Group module imports by type and then alphabetic by variable name. Follow these rules for ordering your module imports:
    + External libraries with type definitions
    + Internal typescript modules with wildcard imports
    + Internal typescript modules without wildcard imports
    + External libraries without type definitions

    > Why? This makes your import section consistent across all modules.

    ```ts
    // bad
    /// <reference path="../typings/tsd.d.ts" />
    import * as Api from './api';
    import _ = require('lodash');
    var Distillery = require('distillery-js');
    import Partner from './partner';
    import * as Util from './util';
    import Q = require('Q');
    var request = require('request');
    import Customer from './customer';

    // good
    /// <reference path="../typings/tsd.d.ts" />
    import _ = require('lodash');
    import Q = require('Q');
    import * as Api from './api';
    import * as Util from './util';
    import Customer from './customer';
    import Partner from './partner';
    var Distillery = require('distillery-js');
    var request = require('request');
    ```

**[⬆ back to top](#table-of-contents)**


## Iterators and Generators

  - [TS 11.01](#ts-1101)<a name='ts-1101'></a> - Don't use iterators. Prefer JavaScript's higher-order functions like `map()` and `reduce()` instead of loops like `for-of`.

    > Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side-effects.

    ```ts
    const numbers = [1, 2, 3, 4, 5];

    // bad
    let sum = 0;
    for (let num of numbers) {

      sum += num;

    }

    sum === 15;

    // good
    let sum = 0;
    numbers.forEach((num) => sum += num);
    sum === 15;

    // best (use the functional force)
    const sum = numbers.reduce((total, num) => total + num, 0);
    sum === 15;
    ```

  - [TS 11.02](#ts-1102)<a name='ts-1102'></a> - Don't use generators for now.

    > Why? They don't transpile well to ES5.

**[⬆ back to top](#table-of-contents)**


## Properties

  - [TS 12.01](#ts-1201)<a name='ts-1201'></a> - Use dot notation when accessing properties.

    ```ts
    const luke = {
      jedi: true,
      age: 28,
    };

    // bad
    const isJedi = luke['jedi'];

    // good
    const isJedi = luke.jedi;
    ```

  - [TS 12.02](#ts-1202)<a name='ts-1202'></a> - Use subscript notation `[]` when accessing properties with a variable.

    ```ts
    const luke = {
      jedi: true,
      age: 28,
    };

    const getProp = function(prop) {

      return luke[prop];

    }

    const isJedi = getProp('jedi');
    ```

**[⬆ back to top](#table-of-contents)**


## Variables

  - [TS 13.01](#ts-1301)<a name='ts-1301'></a> - Always use `const` to declare variables. Not doing so will result in global variables. We want to avoid polluting the global namespace. Captain Planet warned us of that.

    ```ts
    // bad
    superPower = new SuperPower();

    // good
    const superPower = new SuperPower();
    ```

  - [TS 13.02](#ts-1302)<a name='ts-1302'></a> - Use one `const` declaration per variable.

    > Why? It's easier to add new variable declarations this way, and you never have to worry about swapping out a `;` for a `,` or introducing punctuation-only diffs.

    ```ts
    // bad
    const items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';

    // bad
    // (compare to above, and try to spot the mistake)
    const items = getItems(),
        goSportsTeam = true;
        dragonball = 'z';

    // good
    const items = getItems();
    const goSportsTeam = true;
    const dragonball = 'z';
    ```

  - [TS 13.03](#ts-1303)<a name='ts-1303'></a> - Group all your `const`s and then group all your `let`s.

    > Why? This is helpful when later on you might need to assign a variable depending on one of the previous assigned variables.

    ```ts
    // bad
    let i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;

    // bad
    let i;
    const items = getItems();
    let dragonball;
    const goSportsTeam = true;
    let len;

    // good
    const goSportsTeam = true;
    const items = getItems();
    let dragonball;
    let i;
    let length;
    ```

  - [TS 13.04](#ts-1304)<a name='ts-1304'></a> - Assign variables where you need them, but place them in a reasonable place.

     > Why? `let` and `const` are block scoped and not function scoped.

    ```ts
    // bad
    // unnessary function call
    function(hasName) {

      const name = getName();

      if (!hasName) {

        return false;

      }

      this.setFirstName(name);

      return true;

    }

    // good
    function() {

      test();
      console.log('doing stuff..');

      //..other stuff..

      const name = getName();

      if (name === 'test') {

        return false;

      }

      return name;

    }

    // good
    function(hasName) {

      if (!hasName) {

        return false;

      }

      const name = getName();
      this.setFirstName(name);

      return true;

    }
    ```

**[⬆ back to top](#table-of-contents)**


## Hoisting

  - [TS 14.01](#ts-1401)<a name='ts-1401'></a> - `var` declarations get hoisted to the top of their scope, their assignment does not. `const` and `let` declarations are blessed with a new concept called [Temporal Dead Zones (TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let). It's important to know why [typeof is no longer safe](http://es-discourse.com/t/why-typeof-is-no-longer-safe/15).

    ```ts
    // we know this wouldn't work (assuming there
    // is no notDefined global variable)
    function example() {

      console.log(notDefined); // => throws a ReferenceError

    }

    // creating a variable declaration after you
    // reference the variable will work due to
    // variable hoisting. Note: the assignment
    // value of `true` is not hoisted.
    function example() {

      console.log(declaredButNotAssigned); // => undefined
      var declaredButNotAssigned = true;

    }

    // The interpreter is hoisting the variable
    // declaration to the top of the scope,
    // which means our example could be rewritten as:
    function example() {

      let declaredButNotAssigned;
      console.log(declaredButNotAssigned); // => undefined
      declaredButNotAssigned = true;

    }

    // using const and let
    function example() {

      console.log(declaredButNotAssigned); // => throws a ReferenceError
      console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
      const declaredButNotAssigned = true;

    }
    ```

  - [TS 14.02](#ts-1402)<a name='ts-1402'></a> - Anonymous function expressions hoist their variable name, but not the function assignment.

    ```ts
    function example() {

      console.log(anonymous); // => undefined

      anonymous(); // => TypeError anonymous is not a function

      var anonymous = function() {

        console.log('anonymous function expression');

      };

    }
    ```

  - [TS 14.03](#ts-1403)<a name='ts-1403'></a> - Named function expressions hoist the variable name, not the function name or the function body.

    ```ts
    function example() {

      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      superPower(); // => ReferenceError superPower is not defined

      var named = function superPower() {

        console.log('Flying');

      };

    }

    // the same is true when the function name
    // is the same as the variable name.
    function example() {

      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      var named = function named() {

        console.log('named');

      }

    }
    ```

  - [TS 14.04](#ts-1404)<a name='ts-1404'></a> - Function declarations hoist their name and the function body.

    ```ts
    function example() {

      superPower(); // => Flying

      function superPower() {

        console.log('Flying');

      }

    }
    ```

  - For more information refer to [JavaScript Scoping & Hoisting](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting) by [Ben Cherry](http://www.adequatelygood.com/).

**[⬆ back to top](#table-of-contents)**


## Comparison Operators & Equality

  - [TS 15.01](#ts-1501)<a name='ts-1501'></a> - Use `===` and `!==` over `==` and `!=`.

  - [TS 15.02](#ts-1502)<a name='ts-1502'></a> - Conditional statements such as the `if` statement evaulate their expression using coercion with the `ToBoolean` abstract method and always follow these simple rules:

    + **Objects** evaluate to **true**
    + **Undefined** evaluates to **false**
    + **Null** evaluates to **false**
    + **Booleans** evaluate to **the value of the boolean**
    + **Numbers** evaluate to **false** if **+0, -0, or NaN**, otherwise **true**
    + **Strings** evaluate to **false** if an empty string `''`, otherwise **true**

    ```ts
    if ([0]) {
      // true
      // An array is an object, objects evaluate to true
    }
    ```

  - [TS 15.03](#ts-1503)<a name='ts-1503'></a> - Use shortcuts.

    ```ts
    // bad
    if (name !== '') {
      // ...stuff...
    }

    // good
    if (name) {
      // ...stuff...
    }

    // bad
    if (collection.length > 0) {
      // ...stuff...
    }

    // good
    if (collection.length) {
      // ...stuff...
    }
    ```

  - [TS 15.04](#ts-1504)<a name='ts-1504'></a> - For more information see [Truth Equality and JavaScript](http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108) by Angus Croll.

**[⬆ back to top](#table-of-contents)**


## Blocks

  - [TS 16.01](#ts-1601)<a name='ts-1601'></a> - Use braces with multi-line blocks or omit braces for two line blocks.

    ```ts
    // bad
    if (test) return false;

    // ok
    if (test)
      return false;

    // good
    if (test) {

      return false;

    }

    // bad
    function() { return false; }

    // good
    function() {

      return false;

    }
    ```

  - [TS 16.02](#ts-1602)<a name='ts-1602'></a> - If you're using multi-line blocks with `if` and `else`, put `else` on the same line as your
    `if` block's closing brace.

    ```ts
    // bad
    if (test) {
      thing1();
      thing2();
    }
    else {
      thing3();
    }

    // good
    if (test) {
      thing1();
      thing2();
    } else {
      thing3();
    }
    ```

  - [TS 16.03](#ts-1603)<a name='ts-1603'></a> - If you're using multi-line blocks with `if` and `else`, do not omit curly braces.

    > Why? Omitting curly braces in multi-line blocks can easily cause unexpected behavior.

    ```ts
    // bad
    if (test)
      thing1();
      thing2();
    else
      thing3();

    // good
    if (test) {
      thing1();
      thing2();
    } else {
      thing3();
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Comments

  - [TS 17.01](#ts-1701)<a name='ts-1701'></a> - Comments are strongly encouraged when a line/block of code's purpose or intention is not obvious.

  - [TS 17.02](#ts-1702)<a name='ts-1702'></a> - Comments should be clear and meaningful.

  - [TS 17.03](#ts-1703)<a name='ts-1703'></a> - Comments should be in [JSDoc](http://usejsdoc.org/) format where applicable.

    > Why? JSDocs can be interpreted by numerous IDEs, providing intellisense.

  - [TS 17.04](#ts-1704)<a name='ts-1704'></a> - Use block comments `/** ... */` for multi-line comments. Include a description, specify types and values for all parameters and return values.

    ```ts
    // bad
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param {String} tag
    // @return {Element} element
    const make = function(tag) {

      // ...stuff...

      return element;

    }

    // good
    /**
     * make() returns a new element
     * based on the passed in tag name
     *
     * @param {String} tag
     * @return {Element} element
     */
    const make = function(tag) {

      // ...stuff...

      return element;

    }
    ```

  - [TS 17.05](#ts-1705)<a name='ts-1705'></a> - All classes must have block comments `/**...*/` for all public variables and functions including class description

    ```ts
    /**
     * Contains properties of a Person.
     */
    class Person {
        /**
         * Returns a new Person with the specified name.
         *
         * @param name The name of the new Person.
         */
        static GetPerson(name: string): Person {
            return new Person(name);
        }

        /**
         * @param name The name of the new Person.
         */
        constructor(public name: string) { }

        /**
         * Instructs this Person to walk for a certain amount
         * of time.
         *
         * @param millis The number of milliseconds the Person
         * should walk.
         */
        walkFor(millis: number): void {
            console.log(this.name + ' is now walking.');

            setTimeout(() => {
                console.log(this.name + ' has stopped walking.');
            }, millis);
        }
    }
    ```

  - [TS 17.06](#ts-1706)<a name='ts-1706'></a> - All public functions should have comments

  - [TS 17.07](#ts-1707)<a name='ts-1707'></a> - All functions should have a comment explaining what the function does.

  - [TS 17.08](#ts-1708)<a name='ts-1708'></a> - All function input parameters should be annotated with `@param`

  - [TS 17.09](#ts-1709)<a name='ts-1709'></a> - Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment.

    ```ts
    // bad
    const active = true;  // is current tab

    // good
    // is current tab
    const active = true;

    // bad
    const getType = function() {

      console.log('fetching type...');
      // set the default type to 'no type'
      const type = this._type || 'no type';

      return type;

    }

    // good
    const getType = function() {

      console.log('fetching type...');

      // set the default type to 'no type'
      const type = this._type || 'no type';

      return type;

    }
    ```

  - [TS 17.10](#ts-1710)<a name='ts-1710'></a> - Prefixing your comments with `FIXME` or `TODO` helps other developers quickly understand if you're pointing out a problem that needs to be revisited, or if you're suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable. The actions are `FIXME -- need to figure this out` or `TODO -- need to implement`.

  - [TS 17.11](#ts-1711)<a name='ts-1711'></a> - Use `// FIXME:` to annotate problems.

    ```ts
    class Calculator {

      constructor() {
        // FIXME: shouldn't use a global here
        total = 0;
      }

    }
    ```

  - [TS 17.12](#ts-1712)<a name='ts-1712'></a> - Use `// TODO:` to annotate solutions to problems.

    ```ts
    class Calculator {

      constructor() {
        // TODO: total should be configurable by an options param
        this.total = 0;
      }

    }
    ```

**[⬆ back to top](#table-of-contents)**


## Whitespace

  - [TS 18.01](#ts-1801)<a name='ts-1801'></a> - Use soft tabs set to 2 spaces.

    ```ts
    // bad
    function() {

    ∙∙∙∙const name;

    }

    // bad
    function() {

    ∙const name;

    }

    // good
    function() {

    ∙∙const name;

    }
    ```

  - [TS 18.02](#ts-1802)<a name='ts-1802'></a> - Never use tabs

    > Why? Tabs can lead to trouble when opening files in differenct IDEs/ text editors. Most text editors have a configuration option to change tabs to spaces.

  - [TS 18.03](#ts-1803)<a name='ts-1803'></a> - Place 1 space before the leading brace.

    ```ts
    // bad
    const test = function(){

      console.log('test');

    }

    // good
    const test = function() {

      console.log('test');

    }

    // bad
    dog.set('attr',{
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });

    // good
    dog.set('attr', {
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });
    ```

  - [TS 18.04](#ts-1804)<a name='ts-1804'></a> - Place 1 space before the opening parenthesis in control statements (`if`, `while` etc.). Place no space before the argument list in function calls and declarations.

    ```ts
    // bad
    if(isJedi) {

      fight ();

    }

    // good
    if (isJedi) {

      fight();

    }

    // bad
    const fight = function () {

      console.log ('Swooosh!');

    }

    // good
    const fight = function() {

      console.log('Swooosh!');

    }
    ```

  - [TS 18.05](#ts-1805)<a name='ts-1805'></a> - Offset operators with spaces.

    ```ts
    // bad
    const x=y+5;

    // good
    const x = y + 5;
    ```

  - [TS 18.06](#ts-1806)<a name='ts-1806'></a> - End files with a single newline character.

    ```ts
    // bad
    (function(global) {
      // ...stuff...
    })(this);
    ```

    ```ts
    // bad
    (function(global) {
      // ...stuff...
    })(this);↵
    ↵
    ```

    ```ts
    // good
    (function(global) {
      // ...stuff...
    })(this);↵
    ```

  - [TS 18.07](#ts-1807)<a name='ts-1807'></a> - Use indentation when making long method chains. Use a leading dot, which
    emphasizes that the line is a method call, not a new statement.

    ```ts
    // bad
    $('#items').find('.selected').highlight().end().find('.open').updateCount();

    // bad
    $('#items').
      find('.selected').
        highlight().
        end().
      find('.open').
        updateCount();

    // good
    $('#items')
      .find('.selected')
        .highlight()
        .end()
      .find('.open')
        .updateCount();

    // bad
    const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').class('led', true)
        .attr('width', (radius + margin) * 2).append('svg:g')
        .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
        .call(tron.led);

    // good
    const leds = stage.selectAll('.led')
        .data(data)
      .enter().append('svg:svg')
        .classed('led', true)
        .attr('width', (radius + margin) * 2)
      .append('svg:g')
        .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
        .call(tron.led);
    ```

  - [TS 18.08](#ts-1808)<a name='ts-1808'></a> - Leave a blank line after the opening of a block and before the closing of a block

    ```ts
    // bad
    if (foo) {
      return bar;
    }

    // good
    if (foo) {

      return bar;

    }

    // bad
    const baz = function(foo) {
      return bar;
    }

    // good
    const baz = function(foo) {

      return bar;

    }
    ```

  - [TS 18.09](#ts-1809)<a name='ts-1809'></a> - Leave a blank line after blocks and before the next statement.

    ```ts
    // bad
    if (foo) {

      return bar;

    }
    return baz;

    // good
    if (foo) {

      return bar;

    }

    return baz;

    // bad
    const obj = {
      foo() {
      },
      bar() {
      },
    };
    return obj;

    // good
    const obj = {
      foo() {
      },

      bar() {
      },
    };

    return obj;
    ```

**[⬆ back to top](#table-of-contents)**


## Line Length

  - [TS 19.01](#ts-1901)<a name='ts-1901'></a> - Lines must not be longer than 140 characters.
  - [TS 19.02](#ts-1902)<a name='ts-1902'></a> - When a statement runs over 140 characters on a line, it should be broken up, ideally after a comma or operator.

**[⬆ back to top](#table-of-contents)**


## Commas

  - [TS 20.01](#ts-2001)<a name='ts-2001'></a> - Don't use leading commas:

    ```ts
    // bad
    const story = [
        once
      , upon
      , aTime
    ];

    // good
    const story = [
      once,
      upon,
      aTime,
    ];

    // bad
    const hero = {
        firstName: 'Ada'
      , lastName: 'Lovelace'
      , birthYear: 1815
      , superPower: 'computers'
    };

    // good
    const hero = {
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthYear: 1815,
      superPower: 'computers',
    };
    ```

  - [TS 20.02](#ts-2002)<a name='ts-2002'></a> - Do use a trailing comma:

    > Why? This leads to cleaner git diffs. Also, transpilers like Babel will remove the additional trailing comma in the transpiled code which means you don't have to worry about the [trailing comma problem](es5/README.md#commas) in legacy browsers.

    ```ts
    // bad - git diff without trailing comma
    const hero = {
        firstName: 'Florence',
    -    lastName: 'Nightingale'
    +    lastName: 'Nightingale',
    +    inventorOf: ['coxcomb graph', 'mordern nursing']
    }

    // good - git diff with trailing comma
    const hero = {
        firstName: 'Florence',
        lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'mordern nursing'],
    }

    // bad
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully'
    };

    const heroes = [
      'Batman',
      'Superman'
    ];

    // good
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully',
    };

    const heroes = [
      'Batman',
      'Superman',
    ];
    ```

**[⬆ back to top](#table-of-contents)**


## Semicolons

  - [TS 21.01](#ts-2101)<a name='ts-2101'></a> - Use semicolons to mark the end of statements.

    > Why? Guards against functions becoming arguments when two files with IIFEs are concatenated.

    ```ts
    // bad
    (function() {

      const name = 'Skywalker'
      return name

    })()

    // good
    (() => {

      const name = 'Skywalker';
      return name;

    })();

    // good
    ;(() => {

      const name = 'Skywalker';
      return name;

    })();
    ```

    [Read more](http://stackoverflow.com/a/7365214/1712802).

**[⬆ back to top](#table-of-contents)**


## Type Casting & Coercion

  - [TS 22.01](#ts-2201)<a name='ts-2201'></a> - Perform type coercion at the beginning of the statement.

  - [TS 22.02](#ts-2202)<a name='ts-2202'></a> - Strings:

    ```ts
    this.reviewScore = 9;

    // bad
    const totalScore = this.reviewScore + '';

    // good
    const totalScore = String(this.reviewScore);
    ```

  - [TS 22.03](#ts-2203)<a name='ts-2203'></a> - Use `parseInt` for Numbers and always with a radix for type casting.

    ```ts
    const inputValue = '4';

    // bad
    const val = new Number(inputValue);

    // bad
    const val = +inputValue;

    // bad
    const val = inputValue >> 0;

    // bad
    const val = parseInt(inputValue);

    // good
    const val = Number(inputValue);

    // good
    const val = parseInt(inputValue, 10);
    ```

  - [TS 22.04](#ts-2204)<a name='ts-2204'></a> - If for whatever reason you are doing something wild and `parseInt` is your bottleneck and need to use Bitshift for [performance reasons](http://jsperf.com/coercion-vs-casting/3), leave a comment explaining why and what you're doing.

    ```ts
    /**
     * parseInt was the reason my code was slow.
     * Bitshifting the String to coerce it to a
     * Number made it a lot faster.
     */
    const val = inputValue >> 0;
    ```

  - [TS 22.05](#ts-2205)<a name='ts-2205'></a> - **Note:** Be careful when using bitshift operations. Numbers are represented as [64-bit values](http://es5.github.io/#x4.3.19), but Bitshift operations always return a 32-bit integer ([source](http://es5.github.io/#x11.7)). Bitshift can lead to unexpected behavior for integer values larger than 32 bits. [Discussion](https://github.com/airbnb/javascript/issues/109). Largest signed 32-bit Int is 2,147,483,647:

    ```ts
    2147483647 >> 0 //=> 2147483647
    2147483648 >> 0 //=> -2147483648
    2147483649 >> 0 //=> -2147483647
    ```

  - [TS 22.06](#ts-2206)<a name='ts-2206'></a> - Booleans:

    ```ts
    const age = 0;

    // bad
    const hasAge = new Boolean(age);

    // good
    const hasAge = Boolean(age);

    // good
    const hasAge = !!age;
    ```

**[⬆ back to top](#table-of-contents)**


## Null vs. Undefined

  - [TS 23.01](#ts-2301)<a name='ts-2301'></a> - Prefer to not use either `null` or `undefined` for explict unavailability

    > Why? These values are commonly used to keep a consisten structure between values. In TypeScript you use _types_ to denote the structure.

    ```ts
    // bad
    let foo = { x: 123, y: undefined };

    // good
    let foo: { x: number, y?: number} = { x: 123 };
    ```

  - [TS 23.02](#ts-2302)<a name='ts-2302'></a> - Use `undefined` in general, but always consider returning an object.

    > Why? The more typed information available, the better tooling will work.

    ```ts
    // bad
    return null;

    // ok
    return undefined;

    // good
    return { valid: boolean, value?: Foo };
    ```

  - [TS 23.03](#ts-2303)<a name='ts-2303'></a> - Use `null` where its a part of the API or conventional

    > Why? Not following API conventions can lead to unforseen bugs and errors.

  - [TS 23.04](#ts-2304)<a name='ts-2304'></a> - Use _truthy_ check for **objects** being `null` or `undefined`


    > Why? This saves space and is easier to read.

    ```ts
    // bad
    if (error === null)

    // good
    if (error)
    ```

  - [TS 23.05](#ts-2305)<a name='ts-2305'></a> - Use `== undefined` / `!= undefined` (not `===` / `!==`) to check for `null` / `undefined` on primitives

    > Why? This type of check works for `null`/`undefined` values but not other falsy values (like '', 0, false) e.g.

    ```ts
    let error = getPrimitiveValue();

    // bad
    if (error !== null)

    // good
    if (error != undefined)
    ```

    [More about `null`](https://github.com/basarat/typescript-book/blob/master/docs/tips/null.md)

**[⬆ back to top](#table-of-contents)**


## Naming Conventions

  - [TS 24.01](#ts-2401)<a name='ts-2401'></a> - Avoid single letter names. Be descriptive with your naming.

    ```ts
    // bad
    function q() {
      // ...stuff...
    }

    // good
    function query() {
      // ..stuff..
    }
    ```

  - [TS 24.02](#ts-2402)<a name='ts-2402'></a> - Use camelCase when naming objects, functions, and instances.

    > Why? This is a commonly practiced convention in standard JavaScript.

    ```ts
    // bad
    const OBJEcttsssss = {};
    const this_is_my_object = {};
    const c = function() {}

    // good
    const thisIsMyObject = {};
    const thisIsMyFunction = function() {}
    ```

  - [TS 24.03](#ts-2403)<a name='ts-2403'></a> - Use PascalCase when naming constructors, classes, modules, interfaces, namespaces, enums, or enum members.

    ```ts
    // bad
    function user(options) {

      this.name = options.name;

    }

    const bad = new user({
      name: 'nope',
    });

    // good
    module AperatureScience {

      class User {

        constructor(options) {

          this.name = options.name;

        }

      }

    }

    const good = new AperatureScience.User({
      name: 'yup',
    });
    ```

  - [TS 24.04](#ts-2404)<a name='ts-2404'></a> - Use snake_case when naming object properties.

    ```ts
    // bad
    const panda = {
      firstName: 'Mr.',
      LastName: 'Panda'
    }

    // good
    const panda = {
      first_name: 'Mr.',
      Last_name: 'Panda'
    }
    ```

  - [TS 24.05](#ts-2405)<a name='ts-2405'></a> - Use a leading underscore `_` when naming private properties.

    ```ts
    // bad
    this.__firstName__ = 'Panda';
    this.firstName_ = 'Panda';

    // good
    this._firstName = 'Panda';
    ```

  - [TS 24.06](#ts-2406)<a name='ts-2406'></a> - Don't save references to `this`. Use arrow functions or Function#bind.

    ```ts
    // bad
    function foo() {

      const self = this;
      return function() {

        console.log(self);

      };

    }

    // bad
    function foo() {

      const that = this;
      return function() {

        console.log(that);

      };

    }

    // good
    function foo() {

      return () => {
        console.log(this);
      };

    }
    ```

  - [TS 24.07](#ts-2407)<a name='ts-2407'></a> - If your file exports a single class, your filename should be exactly the name of the class.
    ```ts
    // file contents
    class CheckBox {
      // ...
    }
    export default CheckBox;

    // in some other file
    // bad
    import CheckBox from './checkBox';

    // bad
    import CheckBox from './check_box';

    // good
    import CheckBox from './CheckBox';
    ```

  - [TS 24.08](#ts-2408)<a name='ts-2408'></a> - Use camelCase when you export-default a function. Your filename should be identical to your function's name.

    ```ts
    function makeStyleGuide() {
    }

    export default makeStyleGuide;
    ```

  - [TS 24.09](#ts-2409)<a name='ts-2409'></a> - Use PascalCase when you export a singleton / function library / bare object.

    ```ts
    const AirbnbStyleGuide = {
      es6: {
      }
    };

    export default AirbnbStyleGuide;
    ```

**[⬆ back to top](#table-of-contents)**


## Accessors

  - [TS 25.01](#ts-2501)<a name='ts-2501'></a> - Accessor functions for properties are not required.

  - [TS 25.02](#ts-2502)<a name='ts-2502'></a> - If you do make accessor functions use getVal() and setVal('hello').

    ```ts
    // bad
    dragon.age();

    // good
    dragon.getAge();

    // bad
    dragon.age(25);

    // good
    dragon.setAge(25);
    ```

  - [TS 25.03](#ts-2503)<a name='ts-2503'></a> - If the property is a boolean, use isVal() or hasVal().

    ```ts
    // bad
    if (!dragon.age()) {
      return false;
    }

    // good
    if (!dragon.hasAge()) {
      return false;
    }
    ```

  - [TS 25.04](#ts-2504)<a name='ts-2504'></a> - It's okay to create get() and set() functions, but be consistent.

    ```ts
    class Jedi {

      constructor(options = {}) {

        const lightsaber = options.lightsaber || 'blue';
        this.set('lightsaber', lightsaber);

      }

      set(key, val) {

        this[key] = val;

      }

      get(key) {

        return this[key];

      }

    }
    ```

**[⬆ back to top](#table-of-contents)**


## Events

  - [TS 26.01](#ts-2601)<a name='ts-2601'></a> - When attaching data payloads to events (whether DOM events or something more proprietary like Backbone events), pass a hash instead of a raw value. This allows a subsequent contributor to add more data to the event payload without finding and updating every handler for the event. For example, instead of:

    ```ts
    // bad
    $(this).trigger('listingUpdated', listing.id);

    ...

    $(this).on('listingUpdated', function(e, listingId) {
      // do something with listingId
    });
    ```

    prefer:

    **Good**
    ```ts
    $(this).trigger('listingUpdated', { listingId : listing.id });

    ...

    $(this).on('listingUpdated', function(e, data) {
      // do something with data.listingId
    });
    ```

  **[⬆ back to top](#table-of-contents)**


## jQuery

  - [TS 27.01](#ts-2701)<a name='ts-2701'></a> - Prefix jQuery object variables with a `$`.

    ```ts
    // bad
    const sidebar = $('.sidebar');

    // good
    const $sidebar = $('.sidebar');
    ```

  - [TS 27.02](#ts-2702)<a name='ts-2702'></a> - Cache jQuery lookups.

    ```ts
    // bad
    function setSidebar() {

      $('.sidebar').hide();

      // ...stuff...

      $('.sidebar').css({
        'background-color': 'pink'
      });

    }

    // good
    function setSidebar() {

      const $sidebar = $('.sidebar');
      $sidebar.hide();

      // ...stuff...

      $sidebar.css({
        'background-color': 'pink'
      });

    }
    ```

  - [TS 27.03](#ts-2703)<a name='ts-2703'></a> - For DOM queries use Cascading `$('.sidebar ul')` or parent > child `$('.sidebar > ul')`. [jsPerf](http://jsperf.com/jquery-find-vs-context-sel/16)

  - [TS 27.04](#ts-2704)<a name='ts-2704'></a> - Use `find` with scoped jQuery object queries.

    ```ts
    // bad
    $('ul', '.sidebar').hide();

    // bad
    $('.sidebar').find('ul').hide();

    // good
    $('.sidebar ul').hide();

    // good
    $('.sidebar > ul').hide();

    // good
    $sidebar.find('ul').hide();
    ```

**[⬆ back to top](#table-of-contents)**


## Type Annotations

  - [TS 28.01](#ts-2801)<a name='ts-2801'></a> - Type annotations placeholder.


  - [TS 28.02](#ts-2802)<a name='ts-2802'></a> - Use "T" for the type variable if only one is needed.

    ```ts
    function identify<T>(arg: T): T {

        return arg;

    }
    ```

  - [TS 28.03](#ts-2803)<a name='ts-2803'></a> - If more than one type variable is required, start with letter "T" and name your variable in alphabetical sequence.

    ```ts
    function find<T, U extends Findable>(needle: T, haystack: U): U {

      return haystack.find(needle)

    }
    ```

  - [TS 28.04](#ts-2804)<a name='ts-2804'></a> - When possible, allow the compiler to infer type of variables.

    ```ts
    // bad
    const output = identify<string>("myString");

    // good
    const output = identity("myString");
    ```

  - [TS 28.05](#ts-2805)<a name='ts-2805'></a> - When creating factories using generics, be sure to include the constructor function in the type.

    ```ts
    function create<t>(thing: {new(): T;}): T {

      return new thing();

    }
    ```

**[⬆ back to top](#table-of-contents)**


## Interfaces


  - [TS 29.01](#ts-2901)<a name='ts-2901'></a> - Don't prefix Interface names with `I`.

    ```ts
    // bad
    interface IFoo {

    }

    // good
    interface Foo {

    }
    ```

**[⬆ back to top](#table-of-contents)**


## Organization


  - [TS 30.01](#ts-3001)<a name='ts-3001'></a> - 1 file per logical component, and each file should be divided into logical divisions via modules.

    ```ts
    module Automobile {

      module Honda {

      }

    }
    ```

  - [TS 30.02](#ts-3002)<a name='ts-3002'></a> - Export one main module per file so it can be required by other files.

    ```ts
    module Automobile {

      // hidden module, will not be accessible via "require"
      Honda {

      }

      // public module, will be accessible via "require"
      export Ford {

        export function vroom() {

          console.log('vroom!');

        }

      }

    }

    export default Automobile;
    ```

  - [TS 30.03](#ts-3003)<a name='ts-3003'></a> - Order your code (alphabetically) in the following order within each module:
    + var
    + export var
    + let
    + export let
    + const
    + export const
    + interface
    + export interface
    + function
    + export function
    + class
    + export class
    + module
    + export module

**[⬆ back to top](#table-of-contents)**


## Files

  - [TS 31.01](#ts-3101)<a name='ts-3101'></a> - All TypeScript files must have a ".ts" extension.
  - [TS 31.02](#ts-3102)<a name='ts-3102'></a> - They should be all lower case, and only include letters, numbers, and periods.
  - [TS 31.03](#ts-3103)<a name='ts-3103'></a> - It is OK (even recommended) to separate words with periods (e.g. my.view.html).
  - [TS 31.04](#ts-3104)<a name='ts-3104'></a> - All files should end in a new line. This is necessary for some Unix systems.

**[⬆ back to top](#table-of-contents)**


## Browser Compatibility

- [TS 1.01](#ts-0101)<a name='ts-0101'></a> - Target evergreen browsers ie >= 11
- [TS 1.02](#ts-0102)<a name='ts-0102'></a> - Target modern browsers ie >= 9 if it is necessary for a project
- [TS 1.03](#ts-0103)<a name='ts-0103'></a> - Avoid targeting older browsers ie < 9 if at all possible


## ECMAScript 5 Compatibility

  - [TS 33.01](#ts-3301)<a name='ts-3301'></a> - Refer to [Kangax](https://twitter.com/kangax/)'s ES5 [compatibility table](http://kangax.github.com/es5-compat-table/).

**[⬆ back to top](#table-of-contents)**


## ECMAScript 6 Styles

  - [TS 34.01](#ts-3401)<a name='ts-3401'></a> - This is a collection of links to the various es6 features.

    1. [Arrow Functions](#arrow-functions)
    1. [Classes](#constructors)
    1. [Object Shorthand](#es6-object-shorthand)
    1. [Object Concise](#es6-object-concise)
    1. [Object Computed Properties](#es6-computed-properties)
    1. [Template Strings](#es6-template-literals)
    1. [Destructuring](#destructuring)
    1. [Default Parameters](#es6-default-parameters)
    1. [Rest](#es6-rest)
    1. [Array Spreads](#es6-array-spreads)
    1. [Let and Const](#references)
    1. [Iterators and Generators](#iterators-and-generators)
    1. [Modules](#modules)

**[⬆ back to top](#table-of-contents)**


## Typescript 1.5 Styles

  - [TS 35.01](#ts-3501)<a name='ts-3501'></a> - This is a collection of links to the various es6 features.

    1. [Type Annotations](#ts-type-annotations)
    1. [Interfaces](#ts-interfaces)
    1. [Classes](#ts-classes)
    1. [Modules](#ts-modules)
    1. [Generics](#ts-generics)

**[⬆ back to top](#table-of-contents)**


## Formatting

The TypeScript compiler ships with a very nice formatting language service. Whatever output it gives by default is goodenough to reduce the cognitive overload on the team.

Use `tsfmt` to automatically format your code on the command line. Also your IDE (atom/vscode/vs/sublime) already has formatting support built-in.

**[⬆ back to top](#table-of-contents)**


## License

(The MIT License)

Copyright (c) 2014 Airbnb

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**[⬆ back to top](#table-of-contents)**
