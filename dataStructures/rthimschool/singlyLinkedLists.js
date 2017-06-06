// while an array stores items continguously, linked list does not
// linked list stores the data for a particular index and a pointer to the next item in the list
// the items can be stored in any ordered but the next item can be found by the address pointing to it
// first item in the linked list is the head
// advantages:
  // O(1) shift, unshift operations
// disadvantages:
  // O(n) element access. Which means we have to go thru all the references for each item to find the one we want
// linked list vocab:
  // Node: each element is called a Node
  // head: first element in the list
  // tail: last element in the list
  // next: usually referring to the pointer in the next node in the list
  // previous: in a double linked list, the pointer ot the previous element in the list

function Node(value) {
  this.value = value;
  this.next = null;
}

var head = new Node(30);
head.next = new Node(-85);
head.next.next = new Node(10);
head.next.next.next = new Node(0)
console.log(head.value); // 30
console.log(head.next.next.value); // 10
console.log(head);
