**Scope: where to look for things**
* where are the variables?
* who's doing the looking?
* js has function scope only*
  ** not always the case
* thinking like a js compiler:
  * takes a top down approach
    * makes a best guess of what you are doing
  * makes a few passes thru the code:
    * first pass finds the variables
    ```

    var foo = "bar";

    function bar() {
      var foo = "baz";
    }

    function baz(foo) {
      foo = "bam";
      bam = "yay";
    }

    ```
    1) var foo = "bar";
      * global scope
      * string value of a single js statement
      * but it's actually 2 separate declaration
        * var foo
        * = "bam";

    2) function bar() {
      var foo = "baz";
      }
      * function as a whole is compliled
      * finds var = "baz";
      * we are in the scope of bar

    3) function baz(foo) {
        foo = "bam";
        bam = "yay";
      }
      * compile function and the named parameter (foo)
      * we are in the scope of baz

    4) word "var" disappears during compilation  and we are left with "foo"

    5) bam becomes created in the global scope (as long as it is not in 'strict mode' -- then it doesn't exist because it is 'undeclared' -- which means there is no LHS assignment)

  **Compiler Talk**
  LHS - left hand side of assignment (target)
    * where does this exist in scope?
  RHS - right hand side of assignment (source)

ASIDE:
  ***function declaration***
  ```

  function baz(foo) {
      foo = "bam";
      bam = "yay";
    }

  ```  
    * function name is visible within it's scope and the scope of it's parent
    * load before any code is execute

  ***function expression***
  ```

  var a = function(a,b) {
    return a + b;
  }

  ```
    * function can be named or anonymous
    * defines a function as a part of a larger expression syntax (typically a variable assignment)
    * loads when the interpreter reaches the line of code

    * there will be more info later

**Scope and Execution Example**

```

var foo = "bar";

function bar() {
  var foo = "baz";

  function baz(foo) {
    foo = "bam";
    bam = "yay";
  }
  baz();
}

bar(); // rhs reference for a variable called bar (a function object). will attempt to execute
foo; // bar
bam; // yay (it was created in the global scope when the bar() was called.)
baz(); // global scope has never heard of it and give us a reference error. baz only exists inside bar() and is not reachable.

```

**Function Scope?**
***function declaration and function expression***

```
var foo = function bar() {
  var foo = "baz";

  function baz(foo) {
    foo = bar;
    foo; //function...
  }

  baz();
};

foo();
bar(); // Error!

```

It is a ***declaration*** if the first thing in the statement is the word "function". Otherwise it is an ***expression***.

**Anonymous function expressions are bad:**
1) no way inside of the function to refer to ourself, like in recursion or in a click handler. with a name, it's easy to refer to the function.

2) anonymous functions don't play well in debugging. Give it a name, the name comes up in debugging stack tracings.

3) Self documents code. Makes the code more understandable.

**Block Scope**

```
var foo;

try {
  foo.length;
}
catch (err) {
  console.log(err); // TypeError
}

console.log(err)  // ReferenceError

```
* catch clause is block scoped (not available outside of the block)

**Lexical Scope**

* what does lexical mean?
  * parsing stage is called lexing or compile time scope
  * like going up the floors of a building searching for a particular place

  ```
  function foo() {
    var bar = "bar";

    function baz() {
      console.log(bar); // lexical!
    }
    baz()
  }

  foo();

  ```

  * lexical scope of baz is inside of foo and won't be changed at run time
  * lexical scoping means it knows exactly where all the functions and variables are

  **Eval keyword**

  * pronounced evil
  * treats the string contents as if it was code

  ```

  var bar = 'bar';

  function foo(str) {
    eval(str); //cheating!!
    console.log(bar); //42
  }

  foo("var bar = 42;");

  ```

  * makes the runtime slower
  * never use eval

  * worse way to cheat lexical scope
    * with keyword

    ```
    var obj = {
      a: 2,
      b: 3,
      c: 4
    };

    obj.a = obj.b + obj.c;
    obj.c = obj.b - obj.a;

    with (obj) {
      a = b + c;
      d = b - a;
      d = 3; // ?
    }

    obj.d // undefined
    d; // 3 -- oops!

    ```

  * with is more evil than eval
  * with creates a whole lexical scope at runtime than eval
  * in strict mode, with keyword disallowed

  *IIFE*

  * immediately invoked function expression

  ```

  var foo = 'foo';

  (function() {

    var foo = 'foo2';
    console.log(foo); // 'foo2'

  })();

  console.log(foo); // 'foo'

  ```
  * can hide scope with a function
    * avoid name leakage with an anonymous function declaration wrapper
    * foo now available in global and local scope
  * the function is immediately invoked
  * name your IIFEs
  * it's run once it's reached in the code
  * also makes it global

  ```
  var foo = 'foo';

  (function(bar) {

    var foo = bar;
    console.log(foo); // 'foo'

  })(foo);

  console.log(foo); // 'foo'

  ```

  *IIFE pattern*

  * es6 block scope!
    * let
      * hijacks the scope
      * attaches the variable to the block it appears in rather than the function

  ```
  function foo() {
    var bar = 'bar';
    for (let i = 0; i < bar.length; i++) {
      console.log(bar.charAt(i));
    }
    console.log(i); // ReferenceError
  }

  ```

  * you get the letters of bar printed to console but the console.log outside of the for block is beyond the reach of i
  * we only intend the i for the for loop and no where else so we limit it's reach to the for loop
  * had we used var i = 0 then i can be reached

  ```
  function foo(bar) {
    if (bar) {
      let baz = bar;
      if (baz) {
        let bam = baz;
      }
      console.log(bam); // Error
    }
    console.log(baz); // Error
  }

  foo('bar');

  ```

  * the console.log cannot reach the values of baz and bam because they are outside of the block scope of the if statement

  **problems with let**

  * let keyword does not hoist
  * adds an extra mental tax for refactoring about thinking about block scoping
