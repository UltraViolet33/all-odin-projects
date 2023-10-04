const personFactory = (name, age) => {
  const sayHello = () =>  "heelo";

  return { name, age, sayHello };
};

const test = personFactory("tes", 10);

console.log(test.sayHello);

const Test = (name, age, adress) => {
  const prototype = personFactory(name, age);

  const displayAdress = () => adress

  return Object.assign({}, prototype, { displayAdress });
};



const test2 = Test("bob", 20, "paris");

console.log(test2.displayAdress());



// const Person = (name) => {
//     const sayName = () => console.log(`my name is ${name}`);
//     return {sayName};
//   }
  
//   const Nerd = (name) => {
//     // simply create a person and pull out the sayName function with destructuring assignment syntax!
//     const {sayName} = Person(name);
//     const doSomethingNerdy = () => console.log('nerd stuff');
//     return {sayName, doSomethingNerdy};
//   }
  
//   const jeff = Nerd('jeff');
  
//   jeff.sayName(); 
//   jeff.doSomethingNerdy(); 


