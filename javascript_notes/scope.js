//global scope
let name = "Test";

// global scope
let myFunc = function () {
  let age = 30;
  console.log(age);
  // local scope
};

myFunc();

// console.log(age); // name is not defined

var age = 100;

if (age > 12) {
  //   let dogAge = age * 7;
  var dogAge = age * 7;

  console.log(`You are ${dogAge} dog years old!`);
}

console.log(dogAge);

// Scope A
var myFunction = function () {
  // Scope B
  var name = "Todd"; // defined in Scope B
  var myOtherFunction = function () {
    // Scope C: `name` is accessible here!
    console.log(name);
  };

  myOtherFunction();
};

// myOtherFunction()

myFunction();

var myFunction = function () {
  console.log(this); // this = global, [object Window]
};

myFunction();

var myObject = {
  name: "test",
};

myObject.myMethod = function () {
  console.log(this); // this = Object { myObject }
};

myObject.myMethod();

// var nav = document.querySelector('.nav'); // <nav class="nav">

// var toggleNav = function () {
//   console.log(this); // this = <nav> element
// };

// nav.addEventListener('click', toggleNav, false);

// var nav = document.querySelector('.nav'); // <nav class="nav">

// var toggleNav = function () {
//   console.log(this); // <nav> element
//   setTimeout(function () {
//     console.log(this); // [object Window]
//   }, 1000);
// };

// nav.addEventListener('click', toggleNav, false);

// var nav = document.querySelector('.nav'); // <nav class="nav">
// var toggleNav = function () {
//   var that = this;
//   console.log(that); // <nav> element
//   setTimeout(function () {
//     console.log(that); // <nav> element
//   }, 1000);
// };
// nav.addEventListener('click', toggleNav, false);

// var links = document.querySelectorAll('nav li');

// for (var i = 0; i < links.length; i++) {
//   console.log(this); // [object Window]
// }

var links = document.querySelectorAll("nav li");
for (var i = 0; i < links.length; i++) {
  (function () {
    console.log(this); // li elements
  }).call(links[i]);
}

var Module = (function () {
  var _privateMethod = function () {};
  var publicMethod = function () {};
  return {
    publicMethod: publicMethod,
    anotherPublicMethod: anotherPublicMethod,
  };
})();
