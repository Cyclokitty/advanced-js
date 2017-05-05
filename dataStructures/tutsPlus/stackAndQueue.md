* most commonly used data structues in web dev are:
  * Stack
    * ex. 'undo' operation of a text editor uses a stack to organize data
  * Queue
    * ethe event-loop of a web-browser uses a queue to process data

**Stack**
  *  linear data structure (organizes data into sequential order)
  * like a stack of plates: the latest plate is stacked on top of the previous plate stacked

  ***Operation of a Stack***
  * two operations of a stack:
    * push(data) --adds data
    * pop() -- removes the most recently added data

    ```

    function Stack() {
      this._size = 0;
      this._storage = {};
    }

    ```

    ```this._storage``` enables each instance of ```Stack```
