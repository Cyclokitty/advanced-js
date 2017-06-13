What is recursion?
==================

* Recursion is a function that calls itself until it does not.

* often recursion is used instead of iteration

* recursive function calls must have a base case
  * base case is a specific condition to return a value instead of calling itself again

* note: function calls are stored on the call stack
  * stacks are LIFO(last in, first out)
  * function calls are popped off the stack whe that function returns a value
  * js does not yet fully support proper tail call optimization
    * js runs the risk of overflowing the call stack when dealing with large data sets
