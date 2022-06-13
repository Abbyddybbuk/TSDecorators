function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

//Decorator Factory: Advantage of passing values in function and calling function within function is that you can pass values inside your decorators
@Logger('Logging - Person Name') // This annotation is a decorator which will print the class constructor based on function above
class Person {
  name = "Abhijeet";

  constructor() {
    console.log("Creating Person Object....");
  }
}

const pers = new Person(); //Logger will get printed irrespective whether object has been created or not
console.log(pers);
