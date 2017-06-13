function factorial(num) {
  var nextNum = num - 1;
  // base code:
  if (num === 1) {
    return num;
  }
  return num * factorial(nextNum);
}

// note: this is not the best way to perform a factorial function. If you make num 0 it makes a mess out of the entire thing
